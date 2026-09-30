let _errMsgTimer = null;
let _normalMsgTimer = null;
function raiseErrMsg(t) {
  let text = 'Something went wrong. Please try again.';
  if (!(typeof t === 'undefined')) {
    text = t;
  };
  const el = document.getElementById('errMsg');
  el.textContent = text;
  el.classList.remove('hidden');
  if (_errMsgTimer !== null) clearTimeout(_errMsgTimer);
  _errMsgTimer = setTimeout(() => {
    el.classList.add('hidden');
    _errMsgTimer = null;
  }, Math.max(text.length * 120, 5000));
};
// A leftover error shouldn't sit on top of a result that worked
function clearErrMsg() {
  if (_errMsgTimer !== null) clearTimeout(_errMsgTimer);
  _errMsgTimer = null;
  document.getElementById('errMsg').classList.add('hidden');
};
function raiseNormalMsg(t) {
  let text = '';
  if (!(typeof t === 'undefined')) {
    text = t;
  };
  const el = document.getElementById('normalMsg');
  el.textContent = text;
  el.classList.remove('hidden');
  if (_normalMsgTimer !== null) clearTimeout(_normalMsgTimer);
  _normalMsgTimer = setTimeout(() => {
    el.classList.add('hidden');
    _normalMsgTimer = null;
  }, Math.max(text.length * 120, 5000));
};
function changePercentage(val) {
  document.getElementById('percentage').innerText = Math.floor(val) + '%';
  if (val == 100) {
    document.getElementById('loading').classList.add('hidden');
  } else {
    document.getElementById('loading').classList.remove('hidden');
  }
}
const repaint = async () => {
  for (let i = 0; i < 2; i++) {
      await new Promise(resolve => requestAnimationFrame(resolve));
  }
};
function resetCanvas() {
  const canvas = document.getElementById("canvasOutput");
  if (canvas.getContext) {
      const context = canvas.getContext("2d");
      context.font = '25px Roboto medium';
      context.textAlign = 'left';
      context.textBaseline = 'top';
      context.fillText('Result will appear here', 0, 0);
  }
};
function deletePhoto(e) {
  e.target.closest('.containerItem').remove();
  renumberPhotos();
  if (document.getElementsByClassName('containerItem').length == 0) {
    manageBtnStatus('addImgNotReady');
  }
};
// Stitch order is the DOM order, so number the cards and enable/disable move buttons to match
function renumberPhotos() {
  const items = document.querySelectorAll('.containerItem');
  const caption = document.getElementById('previewCaption');
  caption.classList.toggle('hidden', items.length === 0);
  caption.innerHTML = '<strong>' + items.length + (items.length === 1 ? ' screenshot' : ' screenshots') + '</strong>'
    + ' · matched by where they overlap. Any that can\'t be matched are stacked in this order.';
  items.forEach(function(item, i) {
    const n = i + 1;
    item.querySelector('.thumbNumber').textContent = n;
    item.querySelector('.previewImage').setAttribute('alt', 'Screenshot ' + n);
    item.querySelector('.thumbRemove').setAttribute('aria-label', 'Remove screenshot ' + n);
    const earlier = item.querySelector('.thumbMoveBtn[data-dir="-1"]');
    const later = item.querySelector('.thumbMoveBtn[data-dir="1"]');
    earlier.setAttribute('aria-label', 'Move screenshot ' + n + ' earlier');
    later.setAttribute('aria-label', 'Move screenshot ' + n + ' later');
    earlier.disabled = (i === 0);
    later.disabled = (i === items.length - 1);
  });
};
function movePhoto(e) {
  const btn = e.currentTarget;
  const item = btn.closest('.containerItem');
  if (btn.dataset.dir === '-1' && item.previousElementSibling) {
    item.parentNode.insertBefore(item, item.previousElementSibling);
  } else if (btn.dataset.dir === '1' && item.nextElementSibling) {
    item.parentNode.insertBefore(item.nextElementSibling, item);
  }
  renumberPhotos();
  // Moving the node drops focus; keep it on the same button (or its twin if this one is now disabled)
  (btn.disabled ? item.querySelector('.thumbMoveBtn:not(:disabled)') : btn)?.focus();
};
function addPhoto(e) {
  var preview = document.getElementsByClassName('container')[0];
  var divContainerItem = document.createElement('div');
  divContainerItem.setAttribute('class', 'containerItem');
  divContainerItem.setAttribute('draggable', 'true');
  attachReorderHandlers(divContainerItem);

  var divFrame = document.createElement('div');
  divFrame.setAttribute('class', 'thumbFrame');
  divContainerItem.appendChild(divFrame);

  var spanNumber = document.createElement('span');
  spanNumber.setAttribute('class', 'thumbNumber');
  spanNumber.setAttribute('aria-hidden', 'true');
  divFrame.appendChild(spanNumber);

  var btnRemove = document.createElement('button');
  btnRemove.setAttribute('type', 'button');
  btnRemove.setAttribute('class', 'thumbRemove');
  btnRemove.textContent = '×';
  btnRemove.addEventListener('click', deletePhoto, false);
  divFrame.appendChild(btnRemove);

  var img = document.createElement('img');
  img.setAttribute('class', 'previewImage');
  img.setAttribute('src', e.target.result);
  // Preserve preview-on-click while still allowing the parent to act as a drag source
  img.setAttribute('draggable', 'false');
  img.addEventListener('click', function() {
    openPreviewModal(img.getAttribute('src'));
  });
  divFrame.appendChild(img);

  var divMove = document.createElement('div');
  divMove.setAttribute('class', 'thumbMove');
  [['-1', '‹'], ['1', '›']].forEach(function(d) {
    var btnMove = document.createElement('button');
    btnMove.setAttribute('type', 'button');
    btnMove.setAttribute('class', 'thumbMoveBtn');
    btnMove.dataset.dir = d[0];
    btnMove.textContent = d[1];
    btnMove.addEventListener('click', movePhoto, false);
    divMove.appendChild(btnMove);
  });
  divContainerItem.appendChild(divMove);

  preview.appendChild(divContainerItem);
  renumberPhotos();
};

// Drag-and-drop reorder for preview items
let _draggedItem = null;
function attachReorderHandlers(item) {
  item.addEventListener('dragstart', function(ev) {
    _draggedItem = item;
    item.classList.add('dragging');
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      // Some browsers require setData for drag to fire
      try { ev.dataTransfer.setData('text/plain', ''); } catch (_) {}
    }
  });
  item.addEventListener('dragend', function() {
    item.classList.remove('dragging');
    _draggedItem = null;
    document.querySelectorAll('.containerItem.drag-over-before, .containerItem.drag-over-after').forEach(function(el) {
      el.classList.remove('drag-over-before', 'drag-over-after');
    });
  });
  item.addEventListener('dragover', function(ev) {
    if (!_draggedItem || _draggedItem === item) return;
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
    const rect = item.getBoundingClientRect();
    const before = ev.clientX < rect.left + rect.width / 2;
    item.classList.toggle('drag-over-before', before);
    item.classList.toggle('drag-over-after', !before);
  });
  item.addEventListener('dragleave', function() {
    item.classList.remove('drag-over-before', 'drag-over-after');
  });
  item.addEventListener('drop', function(ev) {
    ev.preventDefault();
    if (!_draggedItem || _draggedItem === item) return;
    const rect = item.getBoundingClientRect();
    const before = ev.clientX < rect.left + rect.width / 2;
    if (before) {
      item.parentNode.insertBefore(_draggedItem, item);
    } else {
      item.parentNode.insertBefore(_draggedItem, item.nextSibling);
    }
    item.classList.remove('drag-over-before', 'drag-over-after');
    renumberPhotos();
  });
}

// Lightbox preview for full-size screenshot view
function openPreviewModal(src) {
  let modal = document.getElementById('previewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'previewModal';
    modal.className = 'hidden';
    const img = document.createElement('img');
    img.id = 'previewModalImage';
    modal.appendChild(img);
    modal.addEventListener('click', closePreviewModal);
    document.body.appendChild(modal);
  }
  document.getElementById('previewModalImage').setAttribute('src', src);
  modal.classList.remove('hidden');
}
function closePreviewModal() {
  const modal = document.getElementById('previewModal');
  if (modal) modal.classList.add('hidden');
}
async function addPhotoFromClipBoard() {
  try {
      // ClipboardItem オブジェクトのリストを取得
    const items = await navigator.clipboard.read();

    // ClipboardItem オブジェクトを一つずつ調べる
    let l_image_index = [];
    for (let i = 0; i < items.length; i++) {
      // ClipboardItem オブジェクト
      const item = items[i];
      // データタイプが "image/png" のデータが存在するかをチェック
      if (item.types.includes('image/png')) {
        l_image_index.push(i);
      }
    }
    if (l_image_index.length == 0) {
      raiseErrMsg("There's no image on your clipboard. Copy a screenshot first, then try again.");
      return;
    }
    changePercentage(0);
    manageBtnStatus('addImgNotReady');
    let cnt_done = 0;
    let had_error = false;
    const finishOne = () => {
      ++cnt_done;
      if (cnt_done == l_image_index.length) {
        manageBtnStatus('removeImgNotReady');
        changePercentage(100);
        if (had_error) {
          raiseErrMsg("Some images on your clipboard couldn't be read.");
        }
      }
    };
    for (let i = 0; i < l_image_index.length; i++) {
      const item = items[l_image_index[i]];
      // Blob オブジェクトを取得
      const blob = await item.getType('image/png');

      // Blob オブジェクトを Data URL として読み取る
      const reader = new FileReader();
      reader.onload = function(e) {
        addPhoto(e);
        finishOne();
      };
      reader.onerror = function() {
        had_error = true;
        finishOne();
      };
      reader.readAsDataURL(blob);
    }
  } catch(e) {
    console.log(e);
    raiseErrMsg("Couldn't read your clipboard. Your browser may block it, so try Choose screenshots instead.");
  }
};
// Only offer the size toggle when the result is scaled down to fit the page
function updateOutputImageToggle() {
  const outputImage = document.getElementById('outputImage');
  if (outputImage.classList.contains('hidden') || !outputImage.naturalWidth) return;
  const s = getComputedStyle(outputImage);
  const chrome = parseFloat(s.paddingLeft) + parseFloat(s.paddingRight) + parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth);
  const scalable = outputImage.naturalWidth + chrome > document.getElementById('outputImageWrap').clientWidth;
  outputImage.classList.toggle('no-toggle', !scalable);
  if (!scalable) outputImage.classList.remove('full-width-image');
  document.getElementById('toggleSizeText').classList.toggle('hidden', !scalable);
};
function toggleOutputImageSize(e) {
  let outputImage = document.getElementById('outputImage');
  if (outputImage.classList.contains('no-toggle')) return;
  if (outputImage.classList.contains('full-width-image')) {
    outputImage.classList.remove('full-width-image');
  } else {
    outputImage.classList.add('full-width-image');
  }
};
function drawMat2Canvas(mat, canvas_element, x, y, width=-1, height=-1) {
  let tmpCanvasElement = document.createElement('canvas');
  tmpCanvasElement.setAttribute('id', 'tmpCanvas');
  cv.imshow(tmpCanvasElement, mat);
  if (width == -1) {
    canvas_element.getContext('2d').drawImage(tmpCanvasElement, x, y);
  } else {
    canvas_element.getContext('2d').drawImage(tmpCanvasElement, x, y, width, height);
  }
  tmpCanvasElement.remove();
}
// スクロール部分についてグループ毎に連結し別々のキャンバスに出力
function outputPartsList2Scroll2CanvasByGroup(imgs, l_group, l_relative_height, output_div, output_class_name) {
  const n_group = Math.max(...l_group) + 1;
  let w_one_col = Math.min(...imgs.map((e) => e.scroll_full_width.cols));
  let l_max_rh = new Array(n_group).fill(0);
  [...Array(n_group).keys()].forEach(function(current_group){
    let tmp_h = 0;
    let img_header = imgs.filter((d, i) => l_group[i] == current_group && l_relative_height[i] == 0)[0];
    // グループ毎の縮尺を算出
    let tmp_scale = w_one_col / img_header.scroll_full_width.cols;
    // キャンバスの高さ算出
    // 一番下の画像の相対座標を加算
    l_max_rh[current_group] = Math.max(...l_relative_height.filter((d, i) => l_group[i] == current_group));
    tmp_h += l_max_rh[current_group];
    // 一番下の画像の高さを加算
    let img_footer = imgs.filter((d, i) => l_group[i] == current_group && l_relative_height[i] == l_max_rh[current_group])[0]
    tmp_h += img_footer.scroll.rows;
    // 汎用レイアウトならフッター分も加算
    if (['common_header_scroll', 'common_scroll_only'].includes(img_footer.rayout_type)) {
      tmp_h += img_footer.footer.rows;
    }
    // 最も小さい画像のグループに合わせて縮小
    tmp_h *= tmp_scale;
    // キャンバス生成
    let canvas_element = document.createElement('canvas');
    canvas_element.setAttribute('class', output_class_name);
    output_div.appendChild(canvas_element);
    // サイズ調整してそれっぽい色を背景色に設定
    canvas_element.width = w_one_col;
    canvas_element.height = tmp_h;
    canvas_element.getContext('2d').fillStyle = 'rgb(242, 242, 242)';
    canvas_element.getContext('2d').fillRect(0, 0, canvas_element.width, canvas_element.height);
    // 相対座標が大きい順のインデックスを取得
    let l_index_by_rh = [];
    if (['common_header_scroll', 'common_scroll_only'].includes(imgs.filter((d, i) => l_group[i] == current_group)[0].rayout_type)) {
      // 汎用レイアウトなら上から貼り付けて最下部のボタンが映るのを防ぐ
      l_index_by_rh = [...Array(imgs.length).keys()].filter((d, i) => l_group[i] == current_group).sort((first, second) => l_relative_height[first] - l_relative_height[second]);
    } else {
      // 他は下から貼り付けて切れ目が出るのを防ぐ
      l_index_by_rh = [...Array(imgs.length).keys()].filter((d, i) => l_group[i] == current_group).sort((first, second) => l_relative_height[second] - l_relative_height[first]);
    }
    // 汎用レイアウト（PC/Steam英語版など、テンプレ未対応UI）の場合は、
    // 連続する画像が重なる領域を上の画像が「持っている」ものとして扱い、
    // 下の画像はその下に続く新規部分のみを描画する。これによりdistが微妙にズレた
    // ときでも行が二重描画されるのを避けられる。
    const is_common_group = ['common_header_scroll', 'common_scroll_only'].includes(
      imgs.filter((d, i) => l_group[i] == current_group)[0].rayout_type
    );
    let painted_until_y = -1;  // 既に描画されたキャンバスyの最下端
    l_index_by_rh.forEach(function(v, i) {
      let img = imgs[v];
      const cur_top_y = l_relative_height[v];
      const cur_bot_y = cur_top_y + img.scroll.rows;
      // 重なり領域は描画済みなのでスキップする
      const trim_top = is_common_group && painted_until_y > cur_top_y
        ? Math.min(painted_until_y - cur_top_y, img.scroll.rows)
        : 0;
      if (trim_top >= img.scroll.rows) {
        // 全部既に描画済 → 何も描画しない
      } else if (trim_top > 0) {
        const sub_scroll = img.scroll.roi(new cv.Rect(0, trim_top, img.scroll.cols, img.scroll.rows - trim_top));
        drawMat2Canvas(sub_scroll, canvas_element, 0, (cur_top_y + trim_top) * tmp_scale, sub_scroll.cols * tmp_scale, sub_scroll.rows * tmp_scale);
        sub_scroll.delete();
      } else {
        drawMat2Canvas(img.scroll, canvas_element, 0, cur_top_y * tmp_scale, img.scroll.cols * tmp_scale, img.scroll.rows * tmp_scale);
      }
      painted_until_y = Math.max(painted_until_y, cur_bot_y);
      // 汎用レイアウトならフッターも描画
      if (i == l_index_by_rh.length - 1 && ['common_header_scroll', 'common_scroll_only'].includes(img.rayout_type)) {
        drawMat2Canvas(img.footer, canvas_element, 0, (l_relative_height[v] + img.scroll.rows) * tmp_scale, img.footer.cols * tmp_scale, img.footer.rows * tmp_scale);
      }
    })
  })
};
function outputScrollCanvas2OneCanvas(imgs, l_group, l_relative_height, eles_scroll_canvas, canvas_element, show_header) {
  const show_close = false;
  const n_group = Math.max(...l_group) + 1;
  let l_scroll_canvas = Array.from(eles_scroll_canvas);
  let w_one_col = Math.min(...imgs.map((e) => e.scroll_full_width.cols));
  let l_h_header = new Array(n_group).fill(0);
  let l_max_rh = new Array(n_group).fill(0);
  let l_scale_per_group = new Array(n_group).fill(1);
  let h = 0;
  [...Array(n_group).keys()].forEach(function(current_group){
    let tmp_h = 0;
    let img_header = imgs.filter((d, i) => l_group[i] == current_group && l_relative_height[i] == 0)[0];
    // グループ毎の縮尺を取得
    l_scale_per_group[current_group] = w_one_col / img_header.scroll_full_width.cols;
    if (show_header) {
      // ヘッダー分の高さを加算
      if ('header' in img_header) {
        tmp_h += img_header.header.rows;
      }
      if ('basic_info' in img_header) {
        tmp_h += img_header.basic_info.rows;
      }
      if ('tab' in img_header) {
        tmp_h += img_header.tab.rows;
      }
      l_h_header[current_group] = tmp_h;
    }
    // スクロール部の高さを加算
    tmp_h += l_scroll_canvas[current_group].height;
    if (show_close) {
      // 閉じるボタンの高さを加算
      console.log('未実装');
    }
    // 最も小さい画像のグループに合わせて縮小
    tmp_h *= l_scale_per_group[current_group];
    h = Math.max(h, tmp_h);
  })
  if (!show_header) {
    // ヘッダー非表示なら幅はスクロール部分のみ基準に
    w_one_col = l_scroll_canvas[0].width;
  }
  // console.log(w, h);
  // console.log(l_scale_per_group);
  // サイズ調整してそれっぽい色を背景色に設定
  let w = n_group * w_one_col;
  canvas_element.width = w;
  canvas_element.height = h;
  canvas_element.getContext('2d').fillStyle = 'rgb(242, 242, 242)';
  canvas_element.getContext('2d').fillRect(0, 0, canvas_element.width, canvas_element.height);

  if (show_header) {
    // ヘッダーを描画
    let l_index_header = [...Array(imgs.length).keys()].filter((d) => l_relative_height[d] == 0);
    l_index_header.forEach(function(i) {
      let current_group = l_group[i];
      let img = imgs[i];
      const scale = l_scale_per_group[current_group];
      let y_cursor = 0;
      if ('header' in img) {
        const dh = img.header.rows * scale;
        drawMat2Canvas(img.header, canvas_element, current_group * w_one_col, y_cursor, w_one_col, dh);
        y_cursor += dh;
      }
      if ('basic_info' in img) {
        const dh = img.basic_info.rows * scale;
        drawMat2Canvas(img.basic_info, canvas_element, current_group * w_one_col, y_cursor, w_one_col, dh);
        y_cursor += dh;
      }
      if ('tab' in img) {
        const dh = img.tab.rows * scale;
        drawMat2Canvas(img.tab, canvas_element, current_group * w_one_col, y_cursor, w_one_col, dh);
        y_cursor += dh;
      }
    })
  }
  // スクロール部を描画
  [...Array(n_group).keys()].forEach(function(current_group){
    canvas_element.getContext('2d').drawImage(l_scroll_canvas[current_group], current_group * w_one_col, l_h_header[current_group] * l_scale_per_group[current_group]);
  })
  if (show_close) {
    // 閉じるボタンを描画
    console.log('未実装');
  }
};
function manageBtnStatus(action) {
  var btnSubmit = document.getElementById('btnSubmit');
  var btnReset = document.getElementById('btnReset');
  switch (action) {
    case 'addImgNotReady':
      btnSubmit.classList.add('imgNotReady');
      btnSubmit.classList.add('disable');
      btnReset.classList.add('imgNotReady');
      break;
    case 'removeImgNotReady':
      btnSubmit.classList.remove('imgNotReady');
      btnReset.classList.remove('imgNotReady');
      btnReset.classList.remove('disable');
      break;
    case 'removeCvNotReady':
      btnSubmit.classList.remove('cvNotReady');
      break;
  }
  if (!btnSubmit.classList.contains('imgNotReady') && !btnSubmit.classList.contains('cvNotReady')) {
    btnSubmit.classList.remove('disable');
  }
  if (btnReset.classList.contains('imgNotReady') && !document.getElementById('canvasOutput')) {
    btnReset.classList.add('disable');
  }
};
function photoPreview(event, fs = null) {
  let files = fs;
  if(files === null){
    files = event.target.files;
  }
  let cnt_done = 0;
  let had_error = false;
  const finishOne = () => {
    ++cnt_done;
    if (cnt_done == files.length) {
      manageBtnStatus('removeImgNotReady');
      if (had_error) {
        raiseErrMsg("Some files couldn't be opened. Make sure they're images (PNG or JPG).");
      }
    }
  };
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.onload = function(e) {
      addPhoto(e);
      finishOne();
    };
    reader.onerror = function() {
      had_error = true;
      finishOne();
    };
    reader.readAsDataURL(files[i]);
  };
};
async function generatePhoto() {
  try {
    const is_show_skill_icon = document.getElementById('showSkillIcon').checked;
    // なんか長辺が2175pxより大きいとMatchShapesでエラーになるので予め小さくしとく
    const limit_px = 2175;
    if (document.getElementById('btnSubmit').classList.contains('imgNotReady')) {
      throw new Error('Add some screenshots first.');
    } else if (document.getElementById('btnSubmit').classList.contains('cvNotReady')) {
      throw new Error('Still loading. Try again in a few seconds.');
    } else if (!('findLastIndex' in Array.prototype)) {
      throw new Error('Your browser is too old for this page. Update it and try again (on iPhone or iPad, iOS 15.4 or later).');
    }
    // ローディング開始
    changePercentage(0);
    await repaint();
    // 入力画像群を隠し要素経由にして等倍で読み込み
    let imgElements = document.getElementsByClassName('previewImage');
    let l_mat = [];
    for (let i = 0; i < imgElements.length; i++) {
      let tmpImgElement = document.createElement('img');
      tmpImgElement.setAttribute('src', imgElements[i].getAttribute('src'));
      let tmpImg = cv.imread(tmpImgElement);
      cv.cvtColor(tmpImg, tmpImg, cv.COLOR_RGBA2RGB, 0);
      // なんか長辺が2175pxより大きいとMatchShapesでエラーになるので予め小さくしとく
      if (tmpImg.rows > limit_px) {
        tmpImg = cv2_resize_fixed_aspect(tmpImg, -1, limit_px);
      } else if (tmpImg.cols > limit_px) {
        tmpImg = cv2_resize_fixed_aspect(tmpImg, limit_px, -1);
      }
      l_mat.push(tmpImg.clone());
      tmpImg.delete();
    };
    // メイン加工関数呼び出し
    let tmp_l_mat = await trim_by_platform(l_mat);
    let l_rects = await get_rects(tmp_l_mat);
    if (is_show_skill_icon) {changePercentage(5)} else {changePercentage(10)};
    await repaint();
    if (l_rects.filter((e) => e.rayout_type == 'unknown').length >= 1) {
      await get_unknown_rects(tmp_l_mat, l_rects);
    }
    let imgs = await trim_parts(tmp_l_mat, l_rects);
    if (is_show_skill_icon) {changePercentage(10)} else {changePercentage(20)};
    await repaint();

    console.log('グループ分け');
    let l_group = await get_group_list(imgs, l_rects);
    if (is_show_skill_icon) {changePercentage(12)} else {changePercentage(25)};
    await repaint();

    console.log('スクロールバーに基づく順序決め');
    await get_order_by_scbar(imgs, l_rects, l_group);
    if (is_show_skill_icon) {changePercentage(15)} else {changePercentage(30)};
    await repaint();

    console.log(imgs);
    console.log('グループ内でテンプレートマッチ');
    const n_tgt = imgs.length;
    // 結果格納用配列初期化
    let arr_val = new Array(n_tgt);
    for (let y = 0; y < n_tgt; y++) {arr_val[y] = new Array(n_tgt).fill(0.0);}
    let arr_loc = new Array(n_tgt);
    for (let y = 0; y < n_tgt; y++) {arr_loc[y] = new Array(n_tgt).fill(0.0);}
    // グループ内でテンプレートマッチ
    let did_scbar_fallback = false;
    for (let i = 0; i < n_tgt; i++) {
      console.log((i + 1) +  '/' + n_tgt);
      const fallback = await match_one_line(imgs, l_group, arr_val, arr_loc, i);
      did_scbar_fallback = did_scbar_fallback || fallback;
      if (is_show_skill_icon) {changePercentage(15 + (25 / n_tgt) * i)} else {changePercentage(30 + (50 / n_tgt) * i)};
      await repaint();
    }
    if (did_scbar_fallback) {
      raiseNormalMsg('Some screenshots were placed using the scrollbar position. Check the joins in the result.');
    }
    arr_val.forEach(function(r){console.log(r)});
    arr_loc.forEach(function(r){console.log(r)});

    let l_relative_height = await get_relative_dist(arr_val, arr_loc, l_group);
    await align_missing_imgs(l_relative_height, l_group, imgs);
    if (is_show_skill_icon) {changePercentage(50)} else {changePercentage(90)};
    await repaint();
    console.log('画像出力');
    let tmpCanvasElement = document.getElementById('canvasOutput');
    if (!tmpCanvasElement) {
      // キャンバスがなかったら生成
      tmpCanvasElement = document.createElement('canvas');
      tmpCanvasElement.setAttribute('id', 'canvasOutput');
      tmpCanvasElement.classList.add('hidden');
      document.getElementById('overview').appendChild(tmpCanvasElement);
    }
    outputPartsList2Scroll2CanvasByGroup(imgs, l_group, l_relative_height, document.getElementById('tmpCanvasScrolls'), 'canvasScroll');
    if (document.getElementById('showSkillIcon').checked) {
      console.log('スキルアイコン追加');
      // 因子の表示位置取得
      let l_detected_factor = detectFactor_by_gamma(document.getElementsByClassName('canvasScroll'));
      changePercentage(75);
      await repaint();
      // 因子名のOCR処理
      l_detected_factor = await ocr_factor_text(document.getElementsByClassName('canvasScroll'), l_detected_factor);
      let ocr_result_text = l_detected_factor.map(d => d.filter(d => 'factor_text' in d && d.factor_text != '' && !(d.factor_text in dict_skills)).map((d) => d.factor_text).join());
      ocr_result_text = ocr_result_text.filter(d => d != '').join();
      if (!ocr_result_text == '') {
        document.getElementById('overviewOCRResult').classList.remove('hidden');
        document.getElementById('outputOCRResult').value = ocr_result_text;
      } else {
        document.getElementById('overviewOCRResult').classList.add('hidden');
      }
      changePercentage(90);
      await repaint();
    } else {
      document.getElementById('overviewOCRResult').classList.add('hidden');
    }
    outputScrollCanvas2OneCanvas(imgs, l_group, l_relative_height, document.getElementsByClassName('canvasScroll'), tmpCanvasElement, document.getElementById('showHeader').checked);

    //img要素に出力
    let outputImage = document.getElementById('outputImage');
    outputImage.src = tmpCanvasElement.toDataURL('image/png');
    outputImage.classList.remove('hidden');
    // ローディング解除
    changePercentage(100);
    clearErrMsg();
    // 保存ボタンを出してスクロール
    document.getElementById('SaveBtnArea').classList.remove('hidden');
    document.getElementById('overview').classList.remove('hidden');
    document.getElementById('toggleSizeText').classList.remove('hidden');
    // Wait for the image to decode so the page is tall enough to scroll the result to the top
    outputImage.decode().catch(function(){}).then(function() {
      document.getElementById('overview').scrollIntoView({behavior : 'smooth', block : 'start'});
    });
    // メモリ解放
    l_mat.forEach(function(m){m.delete();});
    // tmp_l_mat.forEach(function(m){m.delete();});
    // dst.forEach(function(m){m.delete();});
    imgs.forEach(function(i){
      load_parts.forEach(function(p){
        if (p in i) {
          i[p].delete();
        }
      })
    });
  } catch(e) {
    console.log(e);
    // Plain Errors are our own user-facing messages. Anything else (OpenCV throws a bare
    // number, or a TypeError from an unexpected layout) means the stitch itself failed.
    if (e instanceof Error && e.constructor === Error) {
      raiseErrMsg(e.message);
    } else {
      raiseErrMsg("Couldn't stitch these screenshots. Check they're from the same screen, taken the same way, and overlap each other.");
    }
    document.getElementById('loading').classList.add('hidden');
  } finally {
    // tmpCanvasScrolls の中身は途中失敗でも必ず掃除する（次回 Generate に持ち越さない）
    const node = document.getElementById('tmpCanvasScrolls');
    if (node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }
  }
};
function resetPhoto() {
  try {
    if (document.getElementById('btnReset').classList.contains('imgNotReady') && !document.getElementById('canvasOutput')) {
      throw new Error('Nothing to clear yet.');
    }
    // プレビュー画像を全て削除
    const preview = document.getElementsByClassName('container')[0];
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    renumberPhotos();
    // 出力Canvasを削除
    const canvasOutput = document.getElementById('canvasOutput');
    if (canvasOutput) {
      canvasOutput.parentNode.removeChild(canvasOutput);
    }
    // 出力画像を非表示にしてsrcを破棄（メモリ解放）
    const outputImage = document.getElementById('outputImage');
    if (outputImage) {
      outputImage.removeAttribute('src');
      outputImage.classList.add('hidden');
      outputImage.classList.remove('full-width-image');
    }
    // 保存ボタン群を隠してプレースホルダ文言を再表示
    document.getElementById('SaveBtnArea').classList.add('hidden');
    document.getElementById('overview').classList.add('hidden');
    document.getElementById('toggleSizeText').classList.add('hidden');
    // OCR結果欄をクリアして隠す
    const ocrResult = document.getElementById('overviewOCRResult');
    if (ocrResult) ocrResult.classList.add('hidden');
    const ocrText = document.getElementById('outputOCRResult');
    if (ocrText) ocrText.value = '';
    // メッセージ表示をクリア
    document.getElementById('errMsg').classList.add('hidden');
    document.getElementById('normalMsg').classList.add('hidden');
    // 読み込みオーバーレイを念のため隠す
    document.getElementById('loading').classList.add('hidden');
    // ファイル選択履歴をクリアして同じファイルを再選択しても再ロード出来るように
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
    // 残った一時Canvas群も掃除
    const tmpScrolls = document.getElementById('tmpCanvasScrolls');
    if (tmpScrolls) {
      while (tmpScrolls.firstChild) tmpScrolls.removeChild(tmpScrolls.firstChild);
    }
    manageBtnStatus('addImgNotReady');
  } catch(e) {
    raiseErrMsg(e.message);
  }
};
function onOpenCvReady() {
  manageBtnStatus('removeCvNotReady');
};
function GeneratedDownloadAnker(base64, name){
  //アンカータグを生成しhrefへBase64文字列をセット
  const a = document.createElement('a');
  a.href = base64;

  //ダウンロード時のファイル名を指定
  a.download = name;

  //クリックイベントを発生させる
  a.click();
};
function SaveOriginal(canvas_src, ext){
  //出力用canvas生成
  const canvas_out = document.createElement('canvas');
  const ctx_out = canvas_out.getContext('2d');

  //入力canvasをそのまま出力用に書き込み
  canvas_out.width = canvas_src.width;
  canvas_out.height = canvas_src.height;
  ctx_out.drawImage(canvas_src, 0, 0, canvas_src.width, canvas_src.height, 0, 0, canvas_out.width, canvas_out.height);

  let date = new Date();
  let str_dt = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2) + date.getMilliseconds();

  //アンカータグ経由でダウンロード
  switch (ext) {
    case 'jpg':
      GeneratedDownloadAnker(canvas_out.toDataURL('image/jpeg', 0.95), 'stitched_' + str_dt + '.jpg');
      break;
    case 'png':
      GeneratedDownloadAnker(canvas_out.toDataURL('image/png'), 'stitched_' + str_dt + '.png');
      break;
    default:
      GeneratedDownloadAnker(canvas_out.toDataURL('image/jpeg', 0.95), 'stitched_' + str_dt + '.jpg');
  };
  if (!document.getElementById('overviewOCRResult').classList.contains('hidden')) {
    document.getElementById('overviewOCRResult').scrollIntoView({behavior : 'smooth', block : 'start'});
  }
};
function SaveToClipBoard(canvas_src) {
    // Canvas から Blob オブジェクトを生成
  canvas_src.toBlob(async (blob) => {
    try {
        // 画像データをクリップボードに書き込む
      const item = new ClipboardItem({
        'image/png': blob
      });
      await navigator.clipboard.write([item]);
      raiseNormalMsg('Image copied.');
    } catch(e) {
      console.log(e);
      raiseErrMsg("Couldn't copy the image. Your browser may not allow it, so use Save PNG instead.");
    }
  });
}
window.onload = function () {
  let fileArea = document.getElementById('dragDropArea');
  let fileInput = document.getElementById('fileInput');
  fileArea.addEventListener('dragover', function(e){
    e.preventDefault();
    fileArea.classList.add('dragover');
  });
  fileArea.addEventListener('dragleave', function(e){
      e.preventDefault();
      fileArea.classList.remove('dragover');
  });
  fileArea.addEventListener('drop', function(e){
      e.preventDefault();
      fileArea.classList.remove('dragenter');
      let files = e.dataTransfer.files;
      fileInput.files = files;
      photoPreview('onChange',files);
  });
  document.getElementById('btnUploadFromClipboard').addEventListener('click', addPhotoFromClipBoard, false);
  shortcut.add('Ctrl+V', addPhotoFromClipBoard, {});
  document.getElementById('outputImage').addEventListener('click', toggleOutputImageSize, false);
  document.getElementById('outputImage').addEventListener('load', updateOutputImageToggle, false);
  window.addEventListener('resize', updateOutputImageToggle, false);
  // Esc closes the preview lightbox
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePreviewModal();
  });

  // ライトモード/ダークモード切替
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (_) {}
    });
  }
};
