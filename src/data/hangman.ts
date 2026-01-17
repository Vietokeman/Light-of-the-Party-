// Hangman game word data
export interface HangmanWord {
  word: string;
  hint: string;
  category: string;
}

// Sample words about Vietnamese Party History and Ho Chi Minh Ideology (in English)
export const hangmanWords: HangmanWord[] = [
  {
    word: 'INDEPENDENCE',
    hint: 'Mục tiêu chiến đấu của cách mạng',
    category: 'Lịch sử',
  },
  {
    word: 'MARXISM LENINISM',
    hint: 'Nền tảng tư tưởng của Đảng',
    category: 'Lý luận',
  },
  {
    word: 'UNITY',
    hint: 'Sức mạnh từ nhân dân',
    category: 'Giá trị',
  },
  {
    word: 'VIET MINH',
    hint: 'Mặt trận thành lập năm 1941',
    category: 'Tổ chức',
  },
  {
    word: 'DIEN BIEN PHU',
    hint: 'Chiến thắng lừng lẫy năm 1954',
    category: 'Lịch sử',
  },
  {
    word: 'HO CHI MINH',
    hint: 'Người sáng lập Đảng Cộng sản Việt Nam',
    category: 'Nhân vật',
  },
  {
    word: 'AUGUST REVOLUTION',
    hint: 'Sự kiện lịch sử năm 1945',
    category: 'Lịch sử',
  },
  {
    word: 'PEOPLE',
    hint: 'Nguồn gốc sức mạnh của Đảng',
    category: 'Giá trị',
  },
  {
    word: 'PARTY CONGRESS',
    hint: 'Sự kiện quan trọng nhất của Đảng',
    category: 'Tổ chức',
  },
  {
    word: 'COMRADE',
    hint: 'Cách gọi giữa các đảng viên',
    category: 'Văn hóa',
  },
  {
    word: 'COMMUNISM',
    hint: 'Chế độ xã hội cao nhất',
    category: 'Lý luận',
  },
  {
    word: 'LIBERATION',
    hint: 'Mục tiêu giải phóng dân tộc',
    category: 'Lịch sử',
  },
  {
    word: 'REUNIFICATION',
    hint: 'Mục tiêu đạt được năm 1975',
    category: 'Lịch sử',
  },
  {
    word: 'PRESIDENT HO CHI MINH',
    hint: 'Vị lãnh tụ vĩ đại của dân tộc',
    category: 'Nhân vật',
  },
  {
    word: 'REFORM',
    hint: 'Chủ trương đổi mới từ năm 1986',
    category: 'Chính sách',
  },
];

// Utility to get random word
export const getRandomWord = (): HangmanWord => {
  return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
};

// Simple normalization for English
export const normalizeVietnamese = (str: string): string => {
  return str.toUpperCase().trim();
};
