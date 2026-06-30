// Lắng nghe các tin nhắn yêu cầu mạng từ giao diện popup gửi lên
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchFromGitHub") {
    
    // Thực hiện fetch ngầm (Đặc quyền bypass hoàn toàn lỗi CORS / Failed to fetch)
    fetch(request.url, {
      method: request.method || "GET",
      headers: request.headers,
      body: request.body ? JSON.stringify(request.body) : null
    })
    .then(async (response) => {
      const isOk = response.ok;
      const data = await response.json();
      // Trả kết quả về cho popup xử lý tiếp
      sendResponse({ success: isOk, data: data });
    })
    .catch((error) => {
      sendResponse({ success: false, error: error.message });
    });

    return true; // Bắt buộc phải có để giữ kết nối bất đồng bộ
  }
});
