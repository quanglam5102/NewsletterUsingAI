from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json
import warnings
from typing import Optional
from django.conf import settings

# Constants for API configuration
BASE_API_URL = "http://127.0.0.1:7860"
FLOW_ID = settings.FLOW_ID
ENDPOINT = ""  # You can set a specific endpoint name in the flow settings
TWEAKS = {
    "URL-CEwfx": {},
    "Prompt-535bg": {},
    "ParseData-Pfs05": {},
    "ChatOutput-94JgD": {}
}

try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None


class ChatGPTView(APIView):
    permission_classes = [permissions.AllowAny]  # Adjust permissions as needed

    @csrf_exempt
    def post(self, request):
        """
        Handle POST requests to run a flow with a given message and optional tweaks.
        """

        # Extracting parameters from the request body
        message = request.data.get('message', 'randomtext')
        endpoint = request.data.get('endpoint', ENDPOINT or FLOW_ID)
        tweaks_json = request.data.get('tweaks', json.dumps(TWEAKS))
        api_key = request.data.get('api_key')
        output_type = request.data.get('output_type', "chat")
        input_type = request.data.get('input_type', "chat")
        upload_file_path = request.data.get('upload_file')
        components = request.data.get('components')

        if not message:
            return Response({"error": "The message is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Load tweaks from JSON string
        try:
            tweaks = json.loads(tweaks_json)
        except json.JSONDecodeError:
            return Response({"error": "Invalid tweaks JSON string"}, status=status.HTTP_400_BAD_REQUEST)

        # Handle file upload if provided
        if upload_file_path:
            if not upload_file:
                return Response({"error": "Langflow is not installed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            elif not components:
                return Response({"error": "You need to provide the components to upload the file to."}, status=status.HTTP_400_BAD_REQUEST)

            tweaks = upload_file(file_path=upload_file_path, host=BASE_API_URL, flow_id=endpoint, components=[components], tweaks=tweaks)

        # Run the flow
        response = self.run_flow(
            message=message,
            endpoint=endpoint,
            output_type=output_type,
            input_type=input_type,
            tweaks=tweaks,
            api_key=api_key
        )

        return Response(response, status=status.HTTP_200_OK)

    def run_flow(self, message: str, endpoint: str, output_type: str = "chat", input_type: str = "chat", tweaks: Optional[dict] = None, api_key: Optional[str] = None) -> dict:
        """
        Run a flow with a given message and optional tweaks.

        :param message: The message to send to the flow
        :param endpoint: The ID or the endpoint name of the flow
        :param tweaks: Optional tweaks to customize the flow
        :return: The JSON response from the flow
        """
        api_url = f"{BASE_API_URL}/api/v1/run/{endpoint}"

        payload = {
            "input_value": message,
            "output_type": output_type,
            "input_type": input_type,
        }
        headers = None
        if tweaks:
            payload["tweaks"] = tweaks
        if api_key:
            headers = {"x-api-key": api_key}
        
        response = requests.post(api_url, json=payload, headers=headers)

        if response.status_code != 200:
            return {"error": "Failed to run flow", "details": response.text}
        print(response.json())
        return response.json()
