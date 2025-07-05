from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import json

app = FastAPI()

class ChatRequest(BaseModel):
    resume_data: Dict[str, Any]
    user_prompt: str

class ChatResponse(BaseModel):
    success: bool
    message: str
    updated_resume: Optional[Dict[str, Any]] = None
    suggestions: Optional[list] = None

@app.post("/resume/chat", response_model=ChatResponse)
async def chat_with_resume(request: ChatRequest):
    """
    Chat endpoint that accepts resume data as a dictionary and user prompt as a string.
    
    Expected JSON structure:
    {
      "resume_data": { "name": "Harigovind", "skills": "Python" },
      "user_prompt": "Add FastAPI to skills"
    }
    """
    try:
        # Extract the resume data and user prompt
        resume_data = request.resume_data
        user_prompt = request.user_prompt
        
        # Log the received data for debugging
        print(f"Received resume_data: {resume_data}")
        print(f"Received user_prompt: {user_prompt}")
        
        # Example: Add FastAPI to skills if requested
        updated_resume = resume_data.copy()
        
        if "Add FastAPI" in user_prompt.lower() and "skills" in user_prompt.lower():
            current_skills = updated_resume.get("skills", "")
            if "FastAPI" not in current_skills:
                if current_skills:
                    updated_resume["skills"] = current_skills + ", FastAPI"
                else:
                    updated_resume["skills"] = "FastAPI"
        
        # Example: Add more skills based on the prompt
        if "add" in user_prompt.lower() and "skills" in user_prompt.lower():
            # Extract skill names from the prompt (simple example)
            skills_to_add = []
            if "python" in user_prompt.lower():
                skills_to_add.append("Python")
            if "react" in user_prompt.lower():
                skills_to_add.append("React")
            if "node" in user_prompt.lower():
                skills_to_add.append("Node.js")
            if "django" in user_prompt.lower():
                skills_to_add.append("Django")
            
            if skills_to_add:
                current_skills = updated_resume.get("skills", "")
                for skill in skills_to_add:
                    if skill not in current_skills:
                        if current_skills:
                            updated_resume["skills"] = current_skills + f", {skill}"
                        else:
                            updated_resume["skills"] = skill
                        current_skills = updated_resume["skills"]
        
        return ChatResponse(
            success=True,
            message=f"Resume updated based on your request: '{user_prompt}'",
            updated_resume=updated_resume,
            suggestions=[
                "Add more technical skills",
                "Improve the about section",
                "Add project descriptions",
                "Include certifications"
            ]
        )
        
    except Exception as e:
        print(f"Error processing chat request: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Example usage and testing
if __name__ == "__main__":
    import uvicorn
    
    # Test the endpoint with the expected format
    test_data = {
        "resume_data": {"name": "Harigovind", "skills": "Python"},
        "user_prompt": "Add FastAPI to skills"
    }
    
    print("Expected request format:")
    print(json.dumps(test_data, indent=2))
    
    uvicorn.run(app, host="0.0.0.0", port=8000) 