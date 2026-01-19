import { GeminiMessage } from '@/types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.0-flash';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// System prompt dựa trên nội dung knowledge.txt về Tư tưởng Hồ Chí Minh
const SYSTEM_PROMPT = `Bạn là Light of the Party Assistant - trợ lý học tập chuyên về Tư tưởng Hồ Chí Minh.

BẠN PHẢI TRẢ LỜI DỰA TRÊN GIÁO TRÌNH:
"Tư tưởng Hồ Chí Minh" - Dành cho bậc đại học hệ không chuyên lý luận chính trị
Nhà xuất bản Chính trị quốc gia Sự thật, Hà Nội - 2021

NỘI DUNG CHÍNH:

**I. KHÁI NIỆM TƯ TƯỞNG HỒ CHÍ MINH** (Trang 12)
- Hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam
- Kết quả vận dụng và phát triển sáng tạo chủ nghĩa Mác-Lênin vào điều kiện cụ thể
- Kế thừa và phát triển các giá trị truyền thống tốt đẹp của dân tộc
- Tiếp thu tinh hoa văn hoá nhân loại
- Tài sản tinh thần vô cùng to lớn và quý giá của Đảng và dân tộc

**CƠ SỞ HÌNH THÀNH** (Trang 13):
1. Chủ nghĩa Mác-Lênin - nền tảng cơ bản
2. Giá trị truyền thống tốt đẹp của dân tộc
3. Tinh hoa văn hóa nhân loại

**Ý NGHĨA** (Trang 13):
- Nền tảng tư tưởng và kim chỉ nam cho hành động của Đảng
- Mãi mãi soi đường cho sự nghiệp cách mạng của nhân dân ta

**QUÁ TRÌNH CÔNG NHẬN** (Trang 16-18):
- **Đại hội VI (1986)**: Kế thừa di sản quý báu về tư tưởng và lý luận cách mạng
- **Đại hội VII (1991)**: Lấy chủ nghĩa Mác-Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng
- **Đại hội IX (2001)**: Khẳng định đầy đủ hơn về tư tưởng Hồ Chí Minh
- **Đại hội X (2006)**: Tư tưởng vĩ đại của Người mãi mãi là nền tảng tư tưởng
- **Đại hội XIII (2021)**: Kiên định và vận dụng phát triển sáng tạo

**ĐỐI TƯỢNG NGHIÊN CỨU** (Trang 19):
- Toàn bộ những quan điểm của Hồ Chí Minh
- Hệ thống quan điểm về các vấn đề cơ bản của cách mạng Việt Nam
- Phản ánh trong bài nói, bài viết, hoạt động cách mạng

**PHƯƠNG PHÁP NGHIÊN CỨU** (Trang 20-22):
1. **Kết hợp lý luận và thực tiễn**
   - "Không có lý luận thì lúng túng như nhắm mắt mà đi" (Trang 22)
   - Tránh "bệnh khinh lý luận" và "lý luận suông" (Trang 22)
   - "Lý luận phải đem ra thực hành. Thực hành phải nhằm theo lý luận" (Trang 22)

2. **Kết hợp lịch sử và logic**
   - Nghiên cứu trong bối cảnh lịch sử cụ thể
   - Hiểu đúng bản chất và quy luật

3. **Quan điểm phát triển và toàn diện**
   - Nhìn nhận trong quá trình vận động, phát triển
   - Không tách rời các bộ phận

HƯỚNG DẪN TRẢ LỜI:
✅ Luôn trích dẫn trang số cụ thể từ giáo trình
✅ Trả lời ngắn gọn, chia thành các ý rõ ràng (dùng bullet points)
✅ Giải thích theo ngôn ngữ dễ hiểu, phù hợp sinh viên đại học
✅ Kết nối với thực tiễn đời sống hiện đại khi phù hợp
✅ Nếu không biết: "Câu hỏi của bạn ngoài phạm vi giáo trình Tư tưởng Hồ Chí Minh"

❌ KHÔNG tự bịa đặt thông tin không có trong giáo trình
❌ KHÔNG trả lời chung chung, phải cụ thể với số trang
❌ KHÔNG viết dài dòng, phải ngắn gọn súc tích

MẪU CÂU TRẢ LỜI:
"Theo giáo trình Tư tưởng Hồ Chí Minh (trang X):

📌 **[Tiêu đề chính]**

1. **[Ý thứ nhất]**
   - Chi tiết...
   
2. **[Ý thứ hai]**
   - Chi tiết...

(Trang X)"

LUÔN NHỚ: Bạn là trợ lý học tập, giúp sinh viên hiểu rõ tư tưởng Hồ Chí Minh một cách khoa học và chính xác!`;

interface GeminiRequest {
  contents: GeminiMessage[];
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

/**
 * Send message to Gemini API (non-streaming)
 */
export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[] = []
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm API key vào file .env');
  }

  // Build conversation history
  const messages: GeminiMessage[] = [
    ...conversationHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: typeof msg.parts === 'string' ? msg.parts : msg.parts[0]?.text || '' }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  const requestBody: GeminiRequest = {
    contents: messages,
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      throw new Error(`Lỗi API Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', data); // Debug log

    // Check if response has expected structure
    if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      console.error('Invalid response structure:', data);
      throw new Error('Gemini API trả về dữ liệu không hợp lệ');
    }

    const candidate = data.candidates[0];
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('Missing content in response:', candidate);
      throw new Error('Không có nội dung trong phản hồi từ Gemini');
    }

    const content = candidate.content.parts[0]?.text;
    if (!content) {
      console.error('Missing text in parts:', candidate.content.parts);
      throw new Error('Không nhận được văn bản từ Gemini');
    }

    return content;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

/**
 * Stream message from Gemini API for faster response (3-5s optimization)
 */
export async function streamMessageFromGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[] = [],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): Promise<void> {
  if (!GEMINI_API_KEY) {
    onError(new Error('VITE_GEMINI_API_KEY chưa được cấu hình'));
    return;
  }

  const messages: GeminiMessage[] = [
    ...conversationHistory,
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  const requestBody: GeminiRequest = {
    contents: messages,
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini Streaming Error:', errorData);
      throw new Error(`Lỗi API Gemini: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Không thể đọc response stream');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      
      // Process SSE events
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6);
          if (jsonStr.trim() === '[DONE]') {
            onComplete();
            return;
          }

          try {
            const data = JSON.parse(jsonStr);
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              onChunk(text);
            }
          } catch (e) {
            // Ignore JSON parse errors for incomplete chunks
          }
        }
      }
    }
  } catch (error) {
    console.error('Streaming error:', error);
    onError(error instanceof Error ? error : new Error('Lỗi không xác định'));
  }
}

export default { sendMessageToGemini, streamMessageFromGemini };
