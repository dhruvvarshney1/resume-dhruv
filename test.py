import os
import requests
from dotenv import load_dotenv

load_dotenv()  # reads .env in the current directory

api_key = os.getenv("NVIDIA_API_KEY")  # use whatever var name you set
if not api_key:
    raise SystemExit("NVIDIA_API_KEY not found in .env")

resp = requests.get(
    "https://integrate.api.nvidia.com/v1/models",
    headers={"Authorization": f"Bearer {api_key}"},
)

print(resp.status_code)          # 200 = valid, 401 = invalid
print(resp.json() if resp.ok else resp.text)