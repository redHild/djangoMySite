# importing internet scraping packages
import requests
import pandas as pd
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import matplotlib.pyplot as plt

# get text from a document
def getText(url):
    text = requests.get(url).text.upper()
    repl = ['\r','\n','\t','~','!','@','#','$','%','^',
            '&','*','(',')','_','-','=','+','[','{',
            '}',']','|',':',';','"',"'",'<',',','>',
            '.','/','?','0','1','2','3','4','5','6',
            '7','8','9']
    for char in repl:
        text.replace(char,'')
    return text

def countWords(text):
    text = text.split(' ')
    words = {}
    res = {}
    for word in text:
        if len(word) > 3:
            if not word in words:
                words[word] = 1
            else:
                words[word] += 1
    num = 0
    for word in words.keys():
        if words[word] > 50 and not (word == ' ' or word == ''):
            res[word] = words[word]
    return res

TWoO = 'http://www.gutenberg.org/cache/epub/55/pg55.txt'

TAoTS = 'https://www.gutenberg.org/files/74/74-0.txt'

TI = 'https://www.gutenberg.org/files/120/120-0.txt'

TLOZOoT = 'http://www.zeldalegends.net/view/emulation/dumps/zelda64/usa/z64dump(usa).txt'
TLOZtWW= 'http://www.zeldalegends.net/view/emulation/dumps/tww/tww_ENG.txt'


text = getText(TI)

# ---
wordcloud = WordCloud(background_color='white',max_words=50,max_font_size=100).generate(text)

# Display the generated image:
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.show()
# ---
count = countWords(text)
res = pd.DataFrame(list(count.values()),index=list(count.keys()),columns=['counts'])

res.counts.sort_values(ascending=False)[0:len(res)].plot.bar()
plt.show()

#print(count)


