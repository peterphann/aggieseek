from flask import Flask, Response
from flask_cors import CORS, cross_origin
from section import scrape_section

app = Flask(__name__, static_folder='')


@app.route('/sections/<term>/<crn>/', methods=['GET'])
@cross_origin(origin='*')
def sections(term, crn):
    course_info = scrape_section(term, crn)

    if course_info:
        return course_info
    else:
        return Response(f'{{"error": "Course not found", "crn": {crn}, "status": 400}}', status=400,
                        mimetype='application/json')


if __name__ == "__main__":
    app.run(debug=True, port=8080)
