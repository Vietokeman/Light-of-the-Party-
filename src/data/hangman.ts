// Hangman game word data
export interface HangmanWord {
  word: string;
  hint: string;
  category: string;
}

// Sample words about Vietnamese Party History and Ho Chi Minh Ideology
export const hangmanWords: HangmanWord[] = [
  {
    word: 'ĐỘC LẬP',
    hint: 'Tuyên ngôn được đọc ngày 2/9/1945',
    category: 'Lịch sử',
  },
  {
    word: 'CHỦ NGHĨA MÁC LÊNIN',
    hint: 'Nền tảng tư tưởng của Đảng',
    category: 'Lý luận',
  },
  {
    word: 'ĐOÀN KẾT',
    hint: 'Sức mạnh từ nhân dân',
    category: 'Giá trị',
  },
  {
    word: 'VIỆT MINH',
    hint: 'Mặt trận thành lập năm 1941',
    category: 'Tổ chức',
  },
  {
    word: 'ĐIỆN BIÊN PHỦ',
    hint: 'Chiến thắng lừng lẫy năm 1954',
    category: 'Lịch sử',
  },
  {
    word: 'HỒ CHÍ MINH',
    hint: 'Người sáng lập Đảng Cộng sản Việt Nam',
    category: 'Nhân vật',
  },
  {
    word: 'CÁCH MẠNG THÁNG TÁM',
    hint: 'Sự kiện lịch sử năm 1945',
    category: 'Lịch sử',
  },
  {
    word: 'NHÂN DÂN',
    hint: 'Nguồn gốc sức mạnh của Đảng',
    category: 'Giá trị',
  },
  {
    word: 'ĐẢI HỘI ĐẢNG',
    hint: 'Sự kiện quan trọng nhất của Đảng',
    category: 'Tổ chức',
  },
  {
    word: 'ĐỒNG CHÍ',
    hint: 'Cách gọi giữa các đảng viên',
    category: 'Văn hóa',
  },
  {
    word: 'CỘNG SẢN',
    hint: 'Chế độ xã hội cao nhất',
    category: 'Lý luận',
  },
  {
    word: 'GIẢI PHÓNG',
    hint: 'Mục tiêu chiến đấu của cách mạng',
    category: 'Lịch sử',
  },
  {
    word: 'THỐNG NHẤT',
    hint: 'Mục tiêu đạt được năm 1975',
    category: 'Lịch sử',
  },
  {
    word: 'CHỦ TỊCH HỒ CHÍ MINH',
    hint: 'Vị lãnh tụ vĩ đại của dân tộc',
    category: 'Nhân vật',
  },
  {
    word: 'ĐỔI MỚI',
    hint: 'Chủ trương lớn từ năm 1986',
    category: 'Chính sách',
  },
];

// Utility to get random word
export const getRandomWord = (): HangmanWord => {
  return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
};

// Vietnamese character normalization for comparison
export const normalizeVietnamese = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toUpperCase();
};
