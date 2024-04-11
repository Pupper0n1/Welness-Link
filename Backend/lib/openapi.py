from litestar.openapi.config import OpenAPIConfig
from litestar.openapi.spec.license import License
from litestar.openapi.plugins import SwaggerRenderPlugin

swagger_render_plugin = SwaggerRenderPlugin()
swagger_render_plugin.favicon = "/Users/wassemelbouni/Downloads/favicon_package_v0.16/favicon.ico"

config = OpenAPIConfig(
    title="Wellness-Link API",
    version="0.1.0",
    description="Wilbur Elbouni & Andrew Musa",
    # contact=Contact(name="Wilbur Elbouni", email="wilbur.elbouni@ucalgary.ca"),
    use_handler_docstrings=True,
    license=License(
        name="This project is under the MIT License",
        url="https://opensource.org/licenses/MIT",
    ),
    # render_plugins=[swagger_render_plugin],
    # favicon_url="https://www.ucalgary.ca/favicon.ico",
)
"""OpenAPI config for app."""



