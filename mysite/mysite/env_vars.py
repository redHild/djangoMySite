from datetime import date

from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse

static = staticfiles_storage.url
url = reverse

env_vars = {
    "domain":"JakobWilde.net",
    "myname":"Jakob Wilde",
}

html_templates = {
    "footer":"""
        <div class="footer">
            <center>
                <br>© """ + date.today().strftime("%Y") + " " +  env_vars["domain"] + """<br>
                <a href=" """ +  static('resume.pdf') + """ ">Resume</a> | <a href=" """ + url('contact_me') + """">Contact Me</a> | <a href=" """ + url('index') + """ ">Home</a><br>
            </center>
        </div>
        """,
    "base_side_urls":"""
            <br><center><h2>Major Tabs</h2></center>
            <h3><a class="base_urls_btn" style="font-size: 1.2em; line-height: 1.2em;" href=" """ + url('index') + """ ">Home Page</a></h3>
                <a class="base_urls_btn" href=" """ + url('thoughts') + """ ">Thoughts</a>
                <a class="base_urls_btn" href=" """ + url('games') + """ ">Games</a>
                <a class="base_urls_btn" href=" """ + url('contact_me') + """">Contact Me</a>
            <br>
        """
}