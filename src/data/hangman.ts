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
    hint: 'Vai trò duy nhất của Đảng đối với Nhà nước và xã hội',
    category: 'Vai trò Đảng',
  },
  {
    word: 'CAN KIEM LIEM CHINH',
    hint: 'Bốn phẩm chất cần có của cán bộ, đảng viên',
    category: 'Đạo đức',
  },
  {
    word: 'TAP TRUNG DAN CHU',
    hint: 'Nguyên tắc tổ chức và sinh hoạt cơ bản nhất của Đảng',
    category: 'Nguyên tắc',
  },
  {
    word: 'TU PHE BINH',
    hint: 'Nguyên tắc giúp Đảng tự chỉnh đốn và phát triển',
    category: 'Nguyên tắc',
  },
  {
    word: 'PHONG TRAO YEU NUOC',
    hint: 'Một trong ba yếu tố dẫn đến sự ra đời của Đảng',
    category: 'Lịch sử',
  },
  {
    word: 'DUONG KACH MENH',
    hint: 'Tác phẩm của Chủ tịch Hồ Chí Minh về Đảng cách mạng',
    category: 'Tác phẩm',
  },
  {
    word: 'CHI CONG VO TU',
    hint: 'Chuẩn mực cao của đạo đức cách mạng theo tư tưởng Hồ Chí Minh',
    category: 'Đạo đức',
  },
  {
    word: 'PHUC VU NHAN DAN',
    hint: 'Mục đích hoạt động của Đảng',
    category: 'Mục đích',
  },
  {
    word: 'DAN CHU CONG HOA',
    hint: 'Chế độ chính trị của Nhà nước Việt Nam',
    category: 'Nhà nước',
  },
  {
    word: 'TOAN THE NHAN DAN',
    hint: 'Chủ thể tối cao của quyền lực nhà nước',
    category: 'Nhà nước',
  },
  {
    word: 'PHONG CHONG TIEU CUC',
    hint: 'Nhiệm vụ thường xuyên trong xây dựng và bảo vệ Đảng',
    category: 'Xây dựng Đảng',
  },
  {
    word: 'THAM O LANG PHI',
    hint: 'Bác Hồ gọi đây là giặc nội xâm',
    category: 'Tiêu cực',
  },
  {
    word: 'QUYEN LAM CHU',
    hint: 'Quyền cơ bản của nhân dân trong Nhà nước mới',
    category: 'Dân chủ',
  },
  {
    word: 'HIEN PHAP',
    hint: 'Luật cơ bản của Nhà nước',
    category: 'Pháp luật',
  },
  {
    word: 'TONG TUYEN CU',
    hint: 'Hình thức thực hiện quyền dân chủ để bầu đại biểu',
    category: 'Dân chủ',
  },
  {
    word: 'CHINH DON DANG',
    hint: 'Nhiệm vụ xây dựng Đảng sau khi giành được chính quyền',
    category: 'Xây dựng Đảng',
  },
  {
    word: 'DOI NGU CAN BO',
    hint: 'Yếu tố quyết định sự thành bại của cách mạng',
    category: 'Tổ chức',
  },
  {
    word: 'GIAI CAP CONG NHAN',
    hint: 'Giai cấp lãnh đạo cách mạng Việt Nam',
    category: 'Giai cấp',
  },
  {
    word: 'TRUNG THANH VOI DANG',
    hint: 'Tiêu chuẩn chính trị hàng đầu của cán bộ, đảng viên',
    category: 'Đạo đức',
  },
  {
    word: 'LUAT PHAP NGHIEM MINH',
    hint: 'Công cụ của nhà nước pháp quyền để quản lý xã hội',
    category: 'Pháp luật',
  },
  {
    word: 'DANG LA DAO DUC',
    hint: 'Tư tưởng của Hồ Chí Minh về bản chất của Đảng',
    category: 'Đạo đức',
  },
  {
    word: 'DANG LA VAN MINH',
    hint: 'Đảng tiêu biểu cho lương tâm và trí tuệ dân tộc',
    category: 'Văn minh',
  },
  {
    word: 'KY LUAT TU GIAC',
    hint: 'Sức mạnh vô địch của Đảng',
    category: 'Kỷ luật',
  },
  {
    word: 'NHAN DAN LAO DONG',
    hint: 'Nguồn lực to lớn và bền vững của cách mạng',
    category: 'Nhân dân',
  },
  {
    word: 'NHA NUOC PHAP QUYEN',
    hint: 'Hình thức nhà nước quản lý xã hội bằng pháp luật',
    category: 'Nhà nước',
  },
  {
    word: 'DAY TO NHAN DAN',
    hint: 'Quan niệm của Hồ Chí Minh về vai trò của cán bộ',
    category: 'Đạo đức',
  },
  {
    word: 'THAN DAN',
    hint: 'Thái độ của Chính phủ trong quan hệ với nhân dân',
    category: 'Nhà nước',
  },
  {
    word: 'KIEM SOAT QUYEN LUC',
    hint: 'Yêu cầu bắt buộc trong tổ chức quyền lực nhà nước',
    category: 'Quyền lực',
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
