// ============================================================
//  MWG BI — Google Apps Script
//  Sheet name: "Users"
//  Columns:  A=username | B=password | C=displayName | D=role
// ============================================================

const SHEET_NAME = "Users";
const SHEET_ID   = ""; // ← Điền Spreadsheet ID của mày vào đây nếu muốn chỉ định cụ thể
                        //   Nếu để trống, script tự dùng spreadsheet đang gắn với nó

// ── Lấy sheet Users ─────────────────────────────────────────
function getSheet() {
  const ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME);
}

// ── Đọc toàn bộ user (bỏ header row 1) ──────────────────────
function getAllUsers() {
  const sheet = getSheet();
  const data  = sheet.getDataRange().getValues();
  if (data.length <= 1) return []; // chỉ có header
  return data.slice(1).map(row => ({
    username:    String(row[0] || "").trim(),
    password:    String(row[1] || "").trim(),
    displayName: String(row[2] || "").trim(),
    role:        String(row[3] || "US").trim()  // AD hoặc US
  }));
}

// ── Helper: trả JSON ─────────────────────────────────────────
function jsonRes(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
//  doGet — xử lý LOGIN và LIST
//  ?username=...&password=...
//  ?action=list
// ============================================================
function doGet(e) {
  const params = e.parameter || {};

  // ── LIST tất cả user (chỉ trả username, displayName, role — không trả password) ──
  if (params.action === "list") {
    const users = getAllUsers().map(u => ({
      username:    u.username,
      displayName: u.displayName,
      role:        u.role
    }));
    return jsonRes({ status: "success", users });
  }

  // ── LOGIN ──
  const username = (params.username || "").trim();
  const password = (params.password || "").trim();

  if (!username || !password) {
    return jsonRes({ status: "fail", message: "Thiếu username hoặc password" });
  }

  const users = getAllUsers();
  const found = users.find(u => u.username === username && u.password === password);

  if (found) {
    return jsonRes({
      status:      "success",
      displayName: found.displayName || found.username,
      role:        found.role   // "AD" hoặc "US"
    });
  }

  return jsonRes({ status: "fail" });
}

// ============================================================
//  doPost — xử lý REGISTER và DELETE
//  Body JSON:
//    { newUser, newPass, displayName }          → tạo user
//    { action: "delete", targetUser: "..." }    → xoá user
// ============================================================
function doPost(e) {
  let body = {};
  try {
    body = JSON.parse(e.postData.contents || "{}");
  } catch (err) {
    return jsonRes({ status: "error", message: "JSON không hợp lệ" });
  }

  // ── DELETE ──────────────────────────────────────────────
  if (body.action === "delete") {
    const targetUser = (body.targetUser || "").trim();
    if (!targetUser) return jsonRes({ status: "error", message: "Thiếu targetUser" });

    const sheet = getSheet();
    const data  = sheet.getDataRange().getValues();

    // Tìm dòng của user đó (bắt đầu từ row 2, index 1)
    let deletedRow = -1;
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === targetUser) {
        deletedRow = i + 1; // Sheet row number (1-based)
        break;
      }
    }

    if (deletedRow === -1) {
      return jsonRes({ status: "error", message: "Không tìm thấy user" });
    }

    sheet.deleteRow(deletedRow);
    return jsonRes({ status: "success", message: `Đã xoá ${targetUser}` });
  }

  // ── REGISTER ────────────────────────────────────────────
  const newUser     = (body.newUser     || "").trim();
  const newPass     = (body.newPass     || "").trim();
  const displayName = (body.displayName || "").trim();

  if (!newUser || !newPass) {
    return jsonRes({ status: "error", message: "Thiếu username hoặc password" });
  }

  // Kiểm tra trùng
  const users = getAllUsers();
  if (users.find(u => u.username === newUser)) {
    return jsonRes({ status: "duplicate", message: "Tên đăng nhập đã tồn tại" });
  }

  // Ghi vào sheet
  const sheet = getSheet();
  sheet.appendRow([
    newUser,
    newPass,
    displayName || newUser,
    "US"   // role mặc định là User
  ]);

  return jsonRes({ status: "success", message: "Tạo tài khoản thành công" });
}
