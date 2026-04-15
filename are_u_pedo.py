import requests
import json

API_TOKEN = "f763ae5df7c6453da7e27b2ded7713ba"

def detect(image_path):
    url = "https://api.luxand.cloud/photo/detect"
    headers = {"token": API_TOKEN}

    if image_path.startswith("https://"):
        files = {"photo": image_path}
    else:
        files = {"photo": open(image_path, "rb")}

    response = requests.post(url, headers=headers, files=files)
    result = json.loads(response.text)

    if response.status_code == 200:
        return response.json()
    else:
        print("Can't recognize people:", response.text)
        return None
    
image_path = "path_to_image"
result = detect(image_path)

print(result)