import requests
import json

def test_chat_endpoint():
    """Test the chat endpoint with the expected JSON structure."""
    
    # Test data matching the expected format
    test_data = {
        "resume_data": {
            "name": "Harigovind",
            "skills": "Python",
            "about": "A passionate developer",
            "education": [
                {
                    "degree": "Computer Science",
                    "institution": "Amrita University",
                    "year": "2022-present"
                }
            ]
        },
        "user_prompt": "Add FastAPI to skills"
    }
    
    print("Testing chat endpoint with data:")
    print(json.dumps(test_data, indent=2))
    print("\n" + "="*50 + "\n")
    
    try:
        response = requests.post(
            "http://localhost:8000/resume/chat",
            headers={"Content-Type": "application/json"},
            json=test_data
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Success! Response:")
            print(json.dumps(result, indent=2))
        else:
            print("❌ Error Response:")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the FastAPI server is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_chat_endpoint() 