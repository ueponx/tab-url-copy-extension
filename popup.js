document.getElementById('copyBtn').addEventListener('click', async () => {
  const button = document.getElementById('copyBtn');
  const status = document.getElementById('status');
  
  try {
    // ボタンを無効化
    button.disabled = true;
    button.textContent = 'コピー中...';
    
    // 全てのタブを取得
    const tabs = await chrome.tabs.query({});
    
    // URLを改行で結合
    const urls = tabs.map(tab => tab.url).join('\n');
    
    // クリップボードにコピー
    await navigator.clipboard.writeText(urls);
    
    // 成功メッセージを表示
    status.textContent = `${tabs.length}個のタブのURLをコピーしました！`;
    status.className = 'success';
    status.style.display = 'block';
    
    // ボタンを元に戻す
    button.disabled = false;
    button.textContent = '全タブのURLをコピー';
    
    // 2秒後にメッセージを非表示
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
    
  } catch (error) {
    console.error('エラー:', error);
    
    // エラーメッセージを表示
    status.textContent = 'コピーに失敗しました';
    status.className = 'error';
    status.style.display = 'block';
    
    // ボタンを元に戻す
    button.disabled = false;
    button.textContent = '全タブのURLをコピー';
  }
});
