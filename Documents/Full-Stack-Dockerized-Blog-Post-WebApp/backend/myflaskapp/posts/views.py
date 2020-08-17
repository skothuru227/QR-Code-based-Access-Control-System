from flask import (
    Blueprint
)
from myflaskapp.posts.resources import posts

blueprint = Blueprint("posts", __name__, static_folder="../static")

blueprint.add_url_rule('/create_post', view_func=posts.create_post, methods=['POST'])
blueprint.add_url_rule('/get_posts', view_func=posts.get_posts, methods=['GET'])
