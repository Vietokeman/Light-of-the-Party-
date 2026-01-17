# ✅ TODO: Checklist Trước Khi Deploy

## 📋 Pre-Deploy Checklist

### 1. Environment Variables (.env)
- [ ] Đã tạo file `.env` từ `.env.example`
- [ ] Đã điền đầy đủ Firebase config
  - [ ] `VITE_FIREBASE_API_KEY`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN`
  - [ ] `VITE_FIREBASE_PROJECT_ID`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `VITE_FIREBASE_APP_ID`
  - [ ] `VITE_FIREBASE_MEASUREMENT_ID`
- [ ] Đã điền Gemini API key
  - [ ] `VITE_GEMINI_API_KEY`
  - [ ] `VITE_GEMINI_MODEL`

### 2. Firebase Setup
- [ ] Đã tạo Firebase project
- [ ] Đã enable **Authentication**
  - [ ] Google Sign-in
  - [ ] Email/Password
- [ ] Đã tạo **Firestore Database**
- [ ] Đã setup Firestore Rules (xem README.md)
- [ ] Đã test login local

### 3. Gemini API
- [ ] Đã tạo API key tại [AI Studio](https://aistudio.google.com/app/apikey)
- [ ] API key hoạt động (test bằng chatbot local)
- [ ] Kiểm tra quota (free: 15 requests/min)

### 4. Code Quality
- [ ] Chạy `npm install` không lỗi
- [ ] Chạy `npm run build` thành công
- [ ] Không có TypeScript errors
- [ ] Đã test chatbot local hoạt động

### 5. Git & GitHub
- [ ] Đã khởi tạo Git repo (`git init`)
- [ ] File `.env` đã được gitignore (không commit)
- [ ] Đã tạo repository trên GitHub
- [ ] Đã push code lên GitHub

### 6. Vercel Deployment
- [ ] Đã có tài khoản Vercel
- [ ] Đã link GitHub với Vercel
- [ ] Đã import project vào Vercel
- [ ] Đã thêm Environment Variables trên Vercel
- [ ] Đã deploy thành công
- [ ] Website live tại Vercel URL

### 7. Post-Deploy Testing
- [ ] Website mở được
- [ ] Firebase Auth hoạt động
  - [ ] Google login
  - [ ] Email/Password login
- [ ] Chatbot hiển thị
- [ ] Chatbot trả lời câu hỏi
- [ ] Không có lỗi trong Console (F12)

### 8. Firebase Authorized Domains
- [ ] Đã thêm Vercel domain vào Firebase
  - Settings > Authorized domains
  - Add: `your-project.vercel.app`

---

## 🧪 Test Cases

### Test 1: Authentication
```
1. Mở website
2. Click "Đăng nhập"
3. Chọn Google hoặc Email
4. Login thành công
5. Tên hiển thị đúng
```

### Test 2: Chatbot Basic
```
1. Click chatbot icon (góc dưới phải)
2. Chat window mở ra
3. Gõ: "Xin chào"
4. Nhận được câu trả lời
5. Câu trả lời có format đẹp
```

### Test 3: Chatbot Knowledge
```
1. Mở chatbot
2. Hỏi: "Khái niệm Tư tưởng Hồ Chí Minh là gì?"
3. Nhận được câu trả lời
4. Có số trang (VD: "Trang 12")
5. Nội dung chính xác
```

### Test 4: UI/UX
```
1. Click minimize button
2. Chat window thu gọn
3. Click maximize button
4. Chat window mở lại
5. Click close button
6. Chat window đóng
7. Click floating button
8. Chat window mở lại
```

---

## 🐛 Common Issues & Solutions

### Issue: "VITE_GEMINI_API_KEY not set"
**Solution**: 
- Check `.env` file exists
- Check key name is exactly `VITE_GEMINI_API_KEY`
- Restart dev server after changing .env

### Issue: Firebase Auth Error
**Solution**:
- Enable Authentication in Firebase Console
- Add domain to Authorized Domains
- Check API keys are correct

### Issue: Chatbot not responding
**Solution**:
- Check Gemini API key is valid
- Check API quota not exceeded
- Open Console (F12) to see errors
- Check network tab for API calls

### Issue: Build Failed on Vercel
**Solution**:
- Run `npm run build` locally first
- Fix any TypeScript errors
- Check all imports are correct
- Verify dependencies in package.json

---

## 📊 Performance Targets

- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Chatbot response < 5s
- [ ] No console errors
- [ ] No TypeScript errors

---

## 🚀 Ready to Deploy?

If all checkboxes are ✅, you're ready!

```bash
# Final check
npm run build

# If successful, deploy!
vercel --prod
```

---

**Good luck! 🍀**
