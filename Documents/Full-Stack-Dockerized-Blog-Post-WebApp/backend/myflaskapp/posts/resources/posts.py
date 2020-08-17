from flask import jsonify, request
from myflaskapp.posts.models import Posts
from myflaskapp.errors.errors import bad_request
from datetime import datetime

def create_post():
    request_data = request.get_json()
    if 'content' not in request_data:
        return bad_request('content not in request data')
    post = Posts.add_or_update(content = request_data['content'], created_at = datetime.utcnow())
    return jsonify(code=200, post=post.serialize())

def get_posts():
    posts = Posts.query.all()
    return jsonify(posts=[post.serialize() for post in posts], code=200)