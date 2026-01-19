// Hangman game word data based on Chapter 4 - Party and State
export interface HangmanWord {
  word: string;
  hint: string;
  category: string;
}

// Words based on Chapter 4: Party and State Building
export const hangmanWords: HangmanWord[] = [
  {
    word: 'LANH DAO',
    hint: 'Vai trò quan trọng nhất của Đảng',
    category: 'Vai trò Đảng',
  },
  {
    word: 'CAN KIEM LIEM CHINH',
    hint: 'Bốn đức của đảng viên',
    category: 'Đạo đức',
  },
  {
    word: 'TAP TRUNG DAN CHU',
    hint: 'Nguyên tắc cơ bản của Đảng',
    category: 'Nguyên tắc',
  },
  {
    word: 'TU PHE BINH',
    hint: 'Luật phát triển của Đảng',
    category: 'Nguyên tắc',
  },
  {
    word: 'PHONG TRAO YEU NUOC',
    hint: 'Yếu tố thứ ba dẫn đến thành lập Đảng',
    category: 'Lịch sử',
  },
  {
    word: 'DUONG KACH MENH',
    hint: 'Tác phẩm của Bác về Đảng cách mạng',
    category: 'Tác phẩm',
  },
  {
    word: 'DI CHUC',
    hint: 'Tâm huyết cuối cùng của Bác',
    category: 'Tác phẩm',
  },
  {
    word: 'CHI CONG VO TU',
    hint: 'Phẩm chất của người cán bộ',
    category: 'Đạo đức',
  },
  {
    word: 'PHUC VU NHAN DAN',
    hint: 'Mục đích hoạt động của Đảng',
    category: 'Mục đích',
  },
  {
    word: 'DAN CHU CONG HOA',
    hint: 'Chế độ của Nhà nước Việt Nam',
    category: 'Nhà nước',
  },
  {
    word: 'TOAN THE NHAN DAN',
    hint: 'Chủ thể quyền lực trong nước',
    category: 'Nhà nước',
  },
  {
    word: 'PHONG CHONG TIEU CUC',
    hint: 'Công việc thường xuyên lâu dài',
    category: 'Xây dựng Đảng',
  },
  {
    word: 'THAM O LANG PHI',
    hint: 'Bạn đồng minh của thực dân',
    category: 'Tiêu cực',
  },
  {
    word: 'QUYEN LAM CHU',
    hint: 'Quyền cơ bản của nhân dân',
    category: 'Dân chủ',
  },
  {
    word: 'HIEN PHAP',
    hint: 'Luật cơ bản của Nhà nước',
    category: 'Pháp luật',
  },
  {
    word: 'TONG TUYEN CU',
    hint: 'Hình thức bầu cử đại biểu',
    category: 'Dân chủ',
  },
  {
    word: 'CHINH DON DANG',
    hint: 'Việc cần làm sau thống nhất',
    category: 'Xây dựng Đảng',
  },
  {
    word: 'DOI NGU CAN BO',
    hint: 'Cần xây dựng vững mạnh',
    category: 'Tổ chức',
  },
  {
    word: 'GIAI CAP CONG NHAN',
    hint: 'Giai cấp lãnh đạo cách mạng',
    category: 'Giai cấp',
  },
  {
    word: 'TRUNG THANH VOI DANG',
    hint: 'Phẩm chất đầu tiên của cán bộ',
    category: 'Đạo đức',
  },
  {
    word: 'LUAT PHAP NGHIEM MINH',
    hint: 'Công cụ chống tiêu cực',
    category: 'Pháp luật',
  },
  {
    word: 'DANG LA DAO DUC',
    hint: 'Quan điểm của Bác năm mươi chín sáu mươi',
    category: 'Đạo đức',
  },
  {
    word: 'DANG LA VAN MINH',
    hint: 'Đảng tiêu biểu cho lương tâm dân tộc',
    category: 'Văn minh',
  },
  {
    word: 'KY LUAT TU GIAC',
    hint: 'Sức mạnh vô địch của Đảng',
    category: 'Kỷ luật',
  },
  {
    word: 'NHAN DAN LAO DONG',
    hint: 'Lực lượng to lớn vô cùng vô tận',
    category: 'Nhân dân',
  },
];

// Utility to get random word
export const getRandomWord = (): HangmanWord => {
  return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
};

// Normalization for Vietnamese with diacritics
export const normalizeVietnamese = (str: string): string => {
  return str
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'D')
    .trim();
};
