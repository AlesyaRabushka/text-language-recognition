from pyquery import PyQuery
import nltk
from nltk.tokenize import word_tokenize
from network_test import neural_net
from nltk.probability import FreqDist
from py3langid import classify

nltk.download('punkt')
from langdetect import detect_langs

bi_grams = {}
tri_grams = {}
quad_grams = {}
all_grams = {}

dict_with_grams = {
    1: bi_grams,
    2: tri_grams,
    3: quad_grams
}


def tokenize(sentences):
    list_word = []
    for sent in nltk.sent_tokenize(sentences.lower()):
        for word in nltk.word_tokenize(sent):
            list_word.append(word)
    return list_word


def check_word(word, n):
    words_dict = dict_with_grams[n - 1]
    try:
        int(word)
    except ValueError:
        try:
            if words_dict[word]:
                words_dict[word] += 1
        except KeyError:
            words_dict.update({word: 1})


def n_gram(word, n):
    if len(word) == n:
        check_word(word, n)
    if len(word) > n - 1:
        start_pos = 0
        while start_pos + n - 1 < len(word):
            check_word(word[start_pos:start_pos + n], n)
            start_pos += 1


def n_gram_model_create(list_word):
    # print('list word', list_word)
    
    bi_grams = {}
    tri_grams = {}
    quad_grams = {}
    all_grams = {}

    dict_with_grams = {
        1: bi_grams,
        2: tri_grams,
        3: quad_grams
    }
    all_grams.clear()
    bi_grams.clear()
    tri_grams.clear()
    quad_grams.clear()
    for item in list_word:
        n_gram(item, 2)
        n_gram(item, 3)
        n_gram(item, 4)
    all_grams.update(bi_grams)
    all_grams.update(tri_grams)
    all_grams.update(quad_grams)
    t = (sorted(all_grams.items(), key=lambda x: x[1]))[::-1][0:300]
    return [x[0] for x in t]


def read_file(route):
    with open(route, encoding='utf-8') as file:
        return file.read()


def html_parser(html):
    pq = PyQuery(html)
    tag = pq('p')
    return tag.text()


def distance(first, second):
    all_dist = 0
    count = 0
    for item in first:
        if item in second:
            count += 1
            x = first.index(item)
            y = second.index(item)
            dist = abs(x-y)
            all_dist += dist
    return all_dist


def start_n_gram(names):
    method_name = 'Метод N-gramm'
    result = []

    text_fr = html_parser(read_file('text_fr.html'))
    text_de = html_parser(read_file('text_de.html'))
    model_fr = n_gram_model_create(tokenize(text_fr))
    model_de = n_gram_model_create(tokenize(text_de))
    i = 0
    print('Метод n-грамм:')
    while i < len(names):
        name = names[i]
        if name != '':
            text = html_parser(read_file(name))
            model = n_gram_model_create(tokenize(text))
            print('model', model)
            count_fr = distance(model, model_fr)
            count_de = distance(model, model_de)
            print(count_de, count_fr)
            if count_fr > count_de:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на французском'
                result.append(bf)
                print('Текст ' + name + ' на французском')
            else:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на английском'
                result.append(bf)
                print('Текст ' + name + ' на английском')
        i += 1
    return result


# start_n_gram()
################################################


def study_fre_words(names):
    
    result = {
        'fr' : [],
        'en' : []
    }
    for name in names:
        if name == 'text_de.html':
            text = html_parser(read_file(name))
            # print(text)
            tokens = tokenize(text)
            print(tokens)
            lowerTokens = []

            for token in tokens:
                lowerTokens.append(token.lower())
            fdist = FreqDist(lowerTokens)
            print('en',fdist)

            bf = []
            for word in tokens:
                # print('study', word, fdist.freq(word))
                if fdist.freq(word) > 0:
                    bf.append(word)

            result['en'].append(bf)
        elif name == 'text_fr.html':
            text = html_parser(read_file(name))
            tokens = tokenize(text)
            lowerTokens = []

            for token in tokens:
                lowerTokens.append(token.lower())
            fdist = FreqDist(lowerTokens)
            print('fr',fdist)

            bf = []
            for word in tokens:
                if fdist.freq(word) > 0:
                    bf.append(word)

            result['fr'].append(bf)

    return result
        
def start_fre_words(names):
    method_name = 'Метод частотных слов'
    study = study_fre_words(['text_de.html', 'text_fr.html'])
    # print(study['en'], study['fr'])
    result = []
    for name in names:
        if name != '':
            text = html_parser(read_file(name))
            tokens = tokenize(text)
            lowerTokens = []

            for token in tokens:
                lowerTokens.append(token.lower())
            fdist = FreqDist(lowerTokens)

            bf = []
            for word in tokens:
                # print('study', word, fdist.freq(word))
                if fdist.freq(word) > 0:
                    bf.append(word)

            count_fr = 0
            count_en = 0
            print(bf)
            for word in bf:
                if word in study['fr'][0]:
                    count_fr += 1
                elif word in study['en'][0]:
                    count_en += 1
            # print(study['fr'], study['en'][0])
            print(count_fr, count_en)

            if count_en > count_fr:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на английском'
                result.append(bf)
                print('Текст ' + name + ' на английском')
            else:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на французском'
                result.append(bf)
                print('Текст ' + name + ' на французском')

    return result





def start_al(names):
    fr_al = 'abcdefghijklmnopqrstuvwxyzàèùéâêîôûçëïüÿ'
    de_al = 'abcdefghijklmnopqrstuvwxyz'
    #de_al = 'abcdefghijklmnopqrstuvwxyzäöüß'

    t = []
    result = []
    d = 0
    print('Алфавитный метод:')
    # print('===',names[1], len(names))
    method_name = 'Алфавитный метод'
    while d < len(names):
        name = names[d]
        if (name != ''):
            text = html_parser(read_file(name))
            model = tokenize(text)
            for item in model:
                for i in item:
                    t.append(i)
            letter = set(t)
            count_fr = 0
            count_de = 0
            for k in letter:
                for j in fr_al:
                    if k == j:
                        count_fr += 1
                for l in de_al:
                    if k == l:
                        count_de += 1
            if count_fr > count_de:
                r = {}
                r['method'] = method_name
                r['name'] = name
                r['text'] = text
                r['result'] = f'Текст {name} на французском'
                result.append(r)
                print('Текст ' + name + ' на французском')
            else:
                r = {}
                r['method'] = method_name
                r['name'] = name
                r['text'] = text
                r['result'] = f'Текст {name} на английском'
                result.append(r)
                print('Текст ' + name + ' на английском')
        d += 1
    return result



def start_neural_net_predictor(names):
    d = 0
    print('Нейросетевой метод:')

    result = []
    method_name = 'Нейросетевой метод'

    while d < len(names):
        # name = 'test' + str(d) + '.html'
        name = names[d]
        if (name != ''):
            text = html_parser(read_file(name))
            model_tmp = filter(lambda w:len(w)<13 ,tokenize(text))
            bad_symb = {'.', ',', ':'}
            model = set(model_tmp) - bad_symb
            count_fr = 0
            count_de = 0
            for world in model:
                res = neural_net(world)
                if (res[0] > res[4]):
                    count_de+=1
                else:
                    count_fr+=1
            if count_fr > count_de:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на французском'
                result.append(bf)
                print('Текст ' + name + ' на французском')
            else:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на английском'
                result.append(bf)
                print('Текст ' + name + ' на английском')
        d += 1
    return result
# start_neural_net_predictor()


def start_neuro(names):
    result = []
    method_name = 'Нейросетевой метод'
    for name in names:
        if name != '':
            text = html_parser(read_file(name))
            res = detect_language_by_neuro(text)
            if (res[0] > res[1]):
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на английском'
                result.append(bf)
                print('Текст ' + name + ' на английском')
            else:
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на французском'
                result.append(bf)
                print('Текст ' + name + ' на французском')
    return result


def detect_language_by_neuro(text: str):
    try:
        lang_arr = classify(text)
        lang_arr = [str(it) for it in lang_arr]
        print(lang_arr)

        check_arr = [0, 0]
        for it in lang_arr:
            lang, numb = it.split(':')
            if lang == 'en':
                check_arr[0] += float(numb)
            else:
                check_arr[1] += float(numb)

        check_arr = [float('{:.2f}'.format((it*100))) for it in check_arr]

        return check_arr
    except:
        pass
    

import fasttext

# Загрузка предварительно обученной модели
model = fasttext.load_model('lid.176.bin')


    
def fastTextNeural(names):
    result = []
    method_name = 'Нейросетевой метод'
    for name in names:
        if name !='':
            text = html_parser(read_file(name))



            predicted_language = model.predict(text)
            print(predicted_language[0][0])



            if predicted_language[0][0] == '__label__fr':
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на французском'
                result.append(bf)


            elif predicted_language[0][0] == '__label__en':
                print('HEER')
                bf = {}
                bf['method'] = method_name
                bf['name'] = name
                bf['text'] = text
                bf['result'] = f'Текст {name} на английском'
                result.append(bf)


            
    return result
        