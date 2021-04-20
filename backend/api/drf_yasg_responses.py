from drf_yasg import openapi

bad_request_response = openapi.Response(description='No content')
not_found_response = openapi.Response(description='Not Found')
created_response = openapi.Response(description="Created")
no_content_response = openapi.Response(description="No content")

def success_response_ok(serializer):
    return openapi.Response(description="Ok", schema=serializer)



