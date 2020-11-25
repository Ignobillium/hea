from flask import Flask

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index():
    with open('static/index-2.html', 'rb') as f:
        return f.read().decode('utf-8')

@app.route('/test')
def test():
    with open('static/test.html', 'rb') as f:
        return f.read().decode('utf-8')

@app.route('/about')
def about():
    with open('static/about.html', 'rb') as f:
        return f.read().decode('utf-8')

@app.route('/students')
def students():
    with open('static/students.html', 'rb') as f:
        return f.read().decode('utf-8')

@app.route('/materials')
def materials():
    with open('static/materials.html', 'rb') as f:
        return f.read().decode('utf-8')
