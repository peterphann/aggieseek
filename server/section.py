from bs4 import BeautifulSoup
import requests

error_json = lambda crn: {
    'seats': {
        'actual': 'ERROR',
        'capacity': 'ERROR',
        'remaining': 'ERROR'
    },
    'crn': crn,
    'title': 'ERROR',
    'course': 'ERROR',
    'section': 'ERROR',
    'term': 'ERROR',
    'professor': 'ERROR'
}


def parse_soup(soup: BeautifulSoup, term, crn) -> dict:
    all_fields = soup.find_all('td', class_='dddefault')

    if len(all_fields) == 0:
        return {}

    static_headers = soup.find('div', class_='staticheaders').text
    term_and_campus = static_headers.split('\n')[1]
    full_term = ' '.join(term_and_campus.split()[:2])
    full_course_name = soup.find('th', class_='ddlabel').text
    split_name = full_course_name.split(' - ')

    course = split_name[2]

    professor = scrape_instructor(split_name[2], term, crn)
    return {
        'seats': {
            'actual': int(all_fields[2].text),
            'capacity': int(all_fields[1].text),
            'remaining': int(all_fields[3].text)
        },
        'crn': int(split_name[1]),
        'title': split_name[0],
        'course': course,
        'section': int(split_name[3]),
        'term': full_term,
        'professor': professor,
        'status': 200
    }


def scrape_instructor(course, term, crn) -> str:
    subject = course.split()[0]
    number = course.split()[1]
    instructor_url = f'https://compass-ssb.tamu.edu/pls/PROD/bwykschd.p_disp_listcrse?term_in={term}&subj_in={subject}&crse_in={number}&crn_in={crn}'

    request = requests.get(instructor_url)
    if (request.status_code != 200): return ""
    instructor_soup = BeautifulSoup(request.text, 'html.parser')

    table_fields = instructor_soup.find_all('td', class_='dddefault')[7].text
    return table_fields


def scrape_section(term, crn) -> dict:
    url = f'https://compass-ssb.tamu.edu/pls/PROD/bwykschd.p_disp_detail_sched?term_in={term}&crn_in={crn}'

    try:
        page = requests.get(url)
        page.raise_for_status()
    except requests.HTTPError as e:
        return {}

    if page.status_code != 200:
        return {}

    soup = BeautifulSoup(page.text, 'html.parser')
    course_info = parse_soup(soup, term, crn)
    return course_info
