import os

from service_api.app import app


# @app.route('/')
# def hello_world():  # put application's code here
#     return 'Hello World!'
# port = os.environ.get('PORT', 5050)

if __name__ == '__main__':
    app.run(port=5050)
    # port = os.environ.get("PORT", 5050)
    # app.run(debug=False, host='0.0.0.0', port=port) # for deployment
