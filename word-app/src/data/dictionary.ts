// Встроенный англо-русский словарь: слово | транскрипция | перевод.
// Покрывает все слова встроенных книг. Для остальных слов используется онлайн-перевод.
const RAW = `
a|ə|неопределённый артикль (один, какой-то)
above|əˈbʌv|над, выше
afraid|əˈfreɪd|испуганный; бояться
after|ˈɑːftə|после
afternoon|ˌɑːftəˈnuːn|день, время после полудня
again|əˈɡen|снова, опять
air|eə|воздух
alive|əˈlaɪv|живой
all|ɔːl|все, весь
alone|əˈləʊn|один, в одиночестве
also|ˈɔːlsəʊ|также, тоже
always|ˈɔːlweɪz|всегда
am|æm|есть (я есть), являюсь
an|ən|неопределённый артикль (перед гласной)
and|ænd|и
anna|ˈænə|Анна (имя)
another|əˈnʌðə|другой, ещё один
answer|ˈɑːnsə|отвечать; ответ
are|ɑː|есть, являются (форма to be)
arm|ɑːm|рука (от плеча до кисти)
around|əˈraʊnd|вокруг
ask|ɑːsk|спрашивать, просить
at|æt|в, у, на (место, время)
autumn|ˈɔːtəm|осень
bag|bæɡ|сумка
be|biː|быть
bed|bed|кровать
begin|bɪˈɡɪn|начинать(ся)
began|bɪˈɡæn|начал(ся) (прош. от begin)
behind|bɪˈhaɪnd|позади, за
below|bɪˈləʊ|внизу, ниже
big|bɪɡ|большой
black|blæk|чёрный
breakfast|ˈbrekfəst|завтрак
bring|brɪŋ|приносить, приводить
burn|bɜːn|гореть
but|bʌt|но
by|baɪ|у, возле; к (времени)
call|kɔːl|звонить; звать
came|keɪm|пришёл (прош. от come)
can|kæn|мочь, уметь
can't|kɑːnt|не могу, нельзя
candle|ˈkændl|свеча
cannot|ˈkænɒt|не может, не могу
cat|kæt|кот, кошка
chapter|ˈtʃæptə|глава
child|tʃaɪld|ребёнок
children|ˈtʃɪldrən|дети
city|ˈsɪti|город
clean|kliːn|чистый; чистить
close|kləʊz|закрывать
coffee|ˈkɒfi|кофе
cold|kəʊld|холодный
come|kʌm|приходить
confident|ˈkɒnfɪdənt|уверенный
cool|kuːl|прохладный
could|kʊd|мог (прош. от can)
crack|kræk|трещина
cry|kraɪ|плакать; кричать
cup|kʌp|чашка
customer|ˈkʌstəmə|клиент, покупатель
dance|dɑːns|танцевать
daniel|ˈdænjəl|Дэниел (имя)
dark|dɑːk|тёмный
day|deɪ|день
deep|diːp|глубокий
delicious|dɪˈlɪʃəs|очень вкусный
did|dɪd|делал (прош. от do)
do|duː|делать
don't|dəʊnt|не (отрицание)
door|dɔː|дверь
down|daʊn|вниз
drink|drɪŋk|пить; напиток
drop|drɒp|ронять
early|ˈɜːli|ранний; рано
empty|ˈempti|пустой
end|end|конец
escape|ɪˈskeɪp|сбежать, вырваться
even|ˈiːvn|даже
evening|ˈiːvnɪŋ|вечер
every|ˈevri|каждый
everybody|ˈevribɒdi|все, каждый
everything|ˈevriθɪŋ|всё
eye|aɪ|глаз
face|feɪs|лицо
fall|fɔːl|падать
father|ˈfɑːðə|отец
fear|fɪə|страх
feel|fiːl|чувствовать
felt|felt|чувствовал (прош. от feel)
find|faɪnd|находить
fire|ˈfaɪə|огонь
fireplace|ˈfaɪəpleɪs|камин
first|fɜːst|первый
five|faɪv|пять
flat|flæt|квартира
floor|flɔː|пол
for|fɔː|для; в течение
free|friː|свободный
fresh|freʃ|свежий
friend|frend|друг
friendly|ˈfrendli|дружелюбный
from|frɒm|из, от
full|fʊl|полный
garden|ˈɡɑːdn|сад
gave|ɡeɪv|дал (прош. от give)
give|ɡɪv|давать
go|ɡəʊ|идти, ехать
grey|ɡreɪ|серый
ground|ɡraʊnd|земля
had|hæd|имел (прош. от have)
hall|hɔːl|холл, коридор
hand|hænd|рука, кисть
handwriting|ˈhændraɪtɪŋ|почерк
happy|ˈhæpi|счастливый
has|hæz|имеет (форма have)
have|hæv|иметь
he|hiː|он
hear|hɪə|слышать
heard|hɜːd|слышал (прош. от hear)
heart|hɑːt|сердце
heavy|ˈhevi|тяжёлый
help|help|помогать; помощь
her|hɜː|её, ей
hill|hɪl|холм
him|hɪm|его, ему
himself|hɪmˈself|себя, себе (о нём)
his|hɪz|его
hit|hɪt|ударять, бить
home|həʊm|дом; домой
hour|ˈaʊə|час
house|haʊs|дом
how|haʊ|как
hug|hʌɡ|объятие; обнимать
huge|hjuːdʒ|огромный
i|aɪ|я
idea|aɪˈdɪə|идея
ill|ɪl|больной
important|ɪmˈpɔːtnt|важный
in|ɪn|в
influence|ˈɪnfluəns|влияние
instead|ɪnˈsted|вместо
into|ˈɪntuː|в (внутрь)
is|ɪz|есть, является (форма to be)
it|ɪt|оно, это
its|ɪts|его, её (о предмете)
job|dʒɒb|работа
kind|kaɪnd|добрый
kitchen|ˈkɪtʃɪn|кухня
knock|nɒk|стучать
know|nəʊ|знать
lake|leɪk|озеро
large|lɑːdʒ|большой
last|lɑːst|последний; at last — наконец
laugh|lɑːf|смеяться
laura|ˈlɔːrə|Лора (имя)
learn|lɜːn|учить, узнавать
learned|lɜːnd|выучил, узнал (прош. от learn)
leave|liːv|уходить, покидать
led|led|вёл (прош. от lead)
left|left|ушёл (прош. от leave); левый
let's|lets|давай(те)
letter|ˈletə|письмо
light|laɪt|свет
lightning|ˈlaɪtnɪŋ|молния
like|laɪk|как, подобно; нравиться
lit|lɪt|осветил (прош. от light)
listen|ˈlɪsn|слушать
live|lɪv|жить
long|lɒŋ|длинный, долгий
look|lʊk|смотреть; выглядеть
lost|lɒst|потерянный; потерял
love|lʌv|любить
low|ləʊ|низкий, тихий
machine|məˈʃiːn|машина, аппарат
made|meɪd|сделал (прош. от make)
make|meɪk|делать
man|mæn|мужчина, человек
manager|ˈmænɪdʒə|менеджер, начальник
many|ˈmeni|много
max|mæks|Макс (имя)
maybe|ˈmeɪbi|может быть
me|miː|мне, меня
met|met|встретил (прош. от meet)
milk|mɪlk|молоко
mind|maɪnd|разум, ум
mistake|mɪˈsteɪk|ошибка
moment|ˈməʊmənt|момент, мгновение
more|mɔː|больше, более
morning|ˈmɔːnɪŋ|утро
mother|ˈmʌðə|мать
much|mʌtʃ|много; очень
mum|mʌm|мама
must|mʌst|должен
my|maɪ|мой
myself|maɪˈself|себя, сам (о себе)
name|neɪm|имя
near|nɪə|рядом, около
need|niːd|нуждаться
neighbour|ˈneɪbə|сосед
nervous|ˈnɜːvəs|нервный, взволнованный
new|njuː|новый
next|nekst|следующий
night|naɪt|ночь
nobody|ˈnəʊbədi|никто
normal|ˈnɔːml|нормальный
not|nɒt|не
now|naʊ|сейчас
o'clock|əˈklɒk|час (о времени)
of|ɒv|из; (родительный падеж)
old|əʊld|старый
on|ɒn|на
one|wʌn|один
only|ˈəʊnli|только
open|ˈəʊpən|открывать; открытый
out|aʊt|вне, наружу
outside|ˌaʊtˈsaɪd|снаружи, на улицу
over|ˈəʊvə|над
pale|peɪl|бледный
park|pɑːk|парк
patient|ˈpeɪʃnt|терпеливый
people|ˈpiːpl|люди
phone|fəʊn|телефон
picture|ˈpɪktʃə|картинка, фото
please|pliːz|пожалуйста
poster|ˈpəʊstə|плакат, объявление
power|ˈpaʊə|власть, сила
proud|praʊd|гордый
put|pʊt|класть, ставить
quick|kwɪk|быстрый
quiet|ˈkwaɪət|тихий
rain|reɪn|дождь
ran|ræn|бежал (прош. от run)
rang|ræŋ|звонил (прош. от ring)
receive|rɪˈsiːv|получать
remain|rɪˈmeɪn|оставаться
remember|rɪˈmembə|помнить, запоминать
river|ˈrɪvə|река
roderick|ˈrɒdərɪk|Родерик (имя)
roof|ruːf|крыша
room|ruːm|комната
sad|sæd|грустный
sadly|ˈsædli|грустно
said|sed|сказал (прош. от say)
saturday|ˈsætədeɪ|суббота
saw|sɔː|видел (прош. от see)
say|seɪ|говорить, сказать
scream|skriːm|кричать, вопить
search|sɜːtʃ|поиск; искать
see|siː|видеть
servant|ˈsɜːvənt|слуга
shake|ʃeɪk|дрожать, трясти
she|ʃiː|она
shirt|ʃɜːt|рубашка
shop|ʃɒp|магазин
short|ʃɔːt|короткий
show|ʃəʊ|показывать
silent|ˈsaɪlənt|безмолвный, тихий
sit|sɪt|сидеть
sky|skaɪ|небо
sleep|sliːp|спать
slow|sləʊ|медленный
slowly|ˈsləʊli|медленно
small|smɔːl|маленький
smile|smaɪl|улыбаться
so|səʊ|так, поэтому
sofa|ˈsəʊfə|диван
softly|ˈsɒftli|мягко, тихо
something|ˈsʌmθɪŋ|что-то
somewhere|ˈsʌmweə|где-то
soon|suːn|скоро
sound|saʊnd|звук
stairs|steəz|лестница
stand|stænd|стоять
step|step|шаг
still|stɪl|всё ещё
stone|stəʊn|камень
stood|stʊd|стоял (прош. от stand)
storm|stɔːm|буря, гроза
strange|streɪndʒ|странный
street|striːt|улица
suddenly|ˈsʌdənli|вдруг, внезапно
sun|sʌn|солнце
sunday|ˈsʌndeɪ|воскресенье
table|ˈteɪbl|стол
talk|tɔːk|разговаривать
tea|tiː|чай
tell|tel|рассказывать, говорить
ten|ten|десять
terrible|ˈterəbl|ужасный
thank|θæŋk|благодарить
that|ðæt|тот, что, который
the|ðə|определённый артикль
their|ðeə|их
then|ðen|затем, тогда
there|ðeə|там
they|ðeɪ|они
thing|θɪŋ|вещь
think|θɪŋk|думать
this|ðɪs|этот, это
thomas|ˈtɒməs|Томас (имя)
through|θruː|через, сквозь
time|taɪm|время; раз
tired|ˈtaɪəd|усталый
to|tuː|к, в; частица инфинитива
today|təˈdeɪ|сегодня
together|təˈɡeðə|вместе
told|təʊld|сказал (прош. от tell)
tomorrow|təˈmɒrəʊ|завтра
took|tʊk|взял (прош. от take)
travel|ˈtrævl|путешествовать, ехать
tree|triː|дерево
truth|truːθ|правда
try|traɪ|пытаться, пробовать
turn|tɜːn|поворачиваться
under|ˈʌndə|под
understand|ˌʌndəˈstænd|понимать
up|ʌp|вверх
us|ʌs|нас, нам
very|ˈveri|очень
visit|ˈvɪzɪt|навещать, посещать
voice|vɔɪs|голос
wait|weɪt|ждать
walk|wɔːk|гулять, идти пешком
wall|wɔːl|стена
want|wɒnt|хотеть
warm|wɔːm|тёплый
was|wɒz|был (прош. от be)
water|ˈwɔːtə|вода
way|weɪ|путь, способ
we|wiː|мы
weak|wiːk|слабый
welcome|ˈwelkəm|добро пожаловать; you're welcome — пожалуйста
went|went|пошёл (прош. от go)
were|wɜː|были (прош. от be)
wet|wet|мокрый, сырой
when|wen|когда
where|weə|где
whisper|ˈwɪspə|шептать
white|waɪt|белый
why|waɪ|почему
wide|waɪd|широкий
will|wɪl|будет (будущее время)
wind|wɪnd|ветер
window|ˈwɪndəʊ|окно
with|wɪð|с
woke|wəʊk|проснулся (прош. от wake)
woman|ˈwʊmən|женщина
word|wɜːd|слово
work|wɜːk|работа; работать
worry|ˈwʌri|волноваться
year|jɪə|год
yesterday|ˈjestədeɪ|вчера
you|juː|ты, вы
young|jʌŋ|молодой
your|jɔː|твой, ваш
`;

export type DictEntry = { word: string; ipa: string; ru: string };

export const DICTIONARY: Record<string, DictEntry> = {};
for (const line of RAW.split('\n')) {
  const [word, ipa, ru] = line.split('|');
  if (word && ru) DICTIONARY[word.trim()] = { word: word.trim(), ipa: ipa.trim(), ru: ru.trim() };
}
