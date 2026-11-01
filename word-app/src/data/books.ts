export type Chapter = {
  title: string;
  paragraphs: string[];
};

export type Book = {
  id: string;
  title: string;
  titleRu: string;
  level: string;
  emoji: string;
  color: string;
  chapters: Chapter[];
};

// Оригинальные короткие рассказы на простом английском.
export const BOOKS: Book[] = [
  {
    id: 'old-house',
    title: 'The Old House on the Hill',
    titleRu: 'Старый дом на холме',
    level: 'A2–B1',
    emoji: '🕯️',
    color: '#7a2e2e',
    chapters: [
      {
        title: 'Chapter 1. The Letter',
        paragraphs: [
          'One cold autumn evening, Thomas received a letter from his old friend Roderick. The letter was short, and the handwriting was weak and strange. "Please come to my house," it said. "I am ill, and I need a friend."',
          'Thomas did not wait. The next morning he took his bag and travelled for many hours. In the evening he saw the house. It stood alone on a dark hill above a silent lake. The windows looked like empty eyes, and the old walls were grey and wet.',
          'Thomas felt a deep fear in his heart, but he could not understand why. "It is only a house," he told himself. Then he walked to the heavy door and knocked.',
        ],
      },
      {
        title: 'Chapter 2. Roderick',
        paragraphs: [
          'A quiet servant opened the door and led Thomas through long, dark rooms. Candles burned on the tables, and their light danced on the walls.',
          'At last they came to a large room with a huge fireplace. Roderick stood near the fire. His face was very pale, his eyes were wide, and his hands were shaking.',
          '"I tell you, my friend, this house has a strange power over my mind, and I cannot escape its dark influence," said Roderick with a pale face and shaking hands. His voice was low but full of fear.',
          '"You are tired," Thomas answered softly. "Sit down. Tomorrow we will open the windows and walk by the lake. The fresh air will help you."',
          'Roderick smiled sadly. "You are kind," he said. "But the house is always listening. It knows everything."',
        ],
      },
      {
        title: 'Chapter 3. The Storm',
        paragraphs: [
          'That night a terrible storm began. The wind screamed around the house, and the rain hit the windows like stones. Thomas could not sleep.',
          'Suddenly he heard a sound from somewhere below. It was slow and heavy, like steps on old stairs. He took a candle and opened his door.',
          'Roderick was standing in the hall. "Do you hear it?" he whispered. "I have heard it for many days. Now I know the truth. The house is alive."',
          'At that moment the lightning lit the sky, and Thomas saw a long, deep crack in the wall. It ran from the ground to the roof. "We must leave," he cried. "Now!"',
          'They ran out into the rain. When they turned around, the old walls began to fall, one after another, into the black water of the lake. Soon only the storm remained. Roderick looked at the empty hill, and for the first time in many years, he felt free.',
        ],
      },
    ],
  },
  {
    id: 'lost-cat',
    title: 'The Lost Cat',
    titleRu: 'Потерявшийся кот',
    level: 'A1–A2',
    emoji: '🐈',
    color: '#2e6b4a',
    chapters: [
      {
        title: 'Chapter 1. Where is Max?',
        paragraphs: [
          'Anna is ten years old. She lives with her mother and father in a small flat in a big city. She also has a cat. His name is Max. He is black and white, and he loves milk.',
          'Every morning Max sleeps on Anna\'s bed. But one Saturday morning the bed was empty. Anna looked under the table, behind the sofa and in the kitchen. Max was not there.',
          '"Mum, I can\'t find Max!" she said. Her mother looked at the open window. "Maybe he went outside," she said. "Let\'s look for him together."',
        ],
      },
      {
        title: 'Chapter 2. The Search',
        paragraphs: [
          'Anna and her mother walked down the street. They asked the neighbours, the man in the shop and the children in the park. Nobody saw a black and white cat.',
          'Anna was very sad. She wanted to cry. Then she had an idea. She made a small poster with a picture of Max and the words: "Lost cat! Please call us."',
          'They put the posters on trees and walls. "Now we must wait," said her mother, and she gave Anna a warm hug.',
        ],
      },
      {
        title: 'Chapter 3. A Happy Day',
        paragraphs: [
          'In the evening the phone rang. It was an old woman from the next street. "I think I have your cat," she said. "He is in my garden, and he is drinking my milk!"',
          'Anna ran all the way to the garden. There was Max, sitting in the sun and looking very happy. Anna laughed and took him in her arms.',
          '"Thank you so much," she said to the woman. "You are welcome," the woman smiled. "Come and visit me again. And bring your cat!"',
          'From that day, Anna always closed the window. And every Sunday she and Max visited their new friend.',
        ],
      },
    ],
  },
  {
    id: 'first-job',
    title: 'My First Day at Work',
    titleRu: 'Мой первый рабочий день',
    level: 'A2',
    emoji: '☕',
    color: '#8a5a1f',
    chapters: [
      {
        title: 'Chapter 1. Early Morning',
        paragraphs: [
          'My name is Daniel, and yesterday was my first day at a new job. I work in a small coffee shop near the river. I was so nervous that I woke up at five o\'clock.',
          'I had a quick breakfast, put on a clean shirt and left the house. The streets were still quiet, and the air was cool and fresh.',
        ],
      },
      {
        title: 'Chapter 2. New People',
        paragraphs: [
          'My manager, Laura, met me at the door. She was friendly and patient. She showed me how to make coffee, how to clean the machine and how to talk to customers.',
          'At first I made many mistakes. I gave one man tea instead of coffee, and I dropped a cup on the floor. I felt terrible, but Laura only laughed. "Everybody makes mistakes on the first day," she said. "Don\'t worry. You are learning."',
        ],
      },
      {
        title: 'Chapter 3. The End of the Day',
        paragraphs: [
          'By the afternoon I felt more confident. I remembered the names of the drinks, and a young woman even said that my coffee was delicious.',
          'In the evening I walked home slowly. I was tired, but I was proud of myself. Today I learned something important: it is normal to be afraid of new things, but the only way to learn is to try.',
        ],
      },
    ],
  },
];
