// [i * 2 for i in range(10)]
// ↓
// [...Array(10).keys()].map((d) => {return d * 2});

// [i * 2 for i in range(10) if i % 2 == 0]
// ↓
// [...Array(10).keys()].filter((d) => d % 2).map((d) => d * 2);

// 検出範囲指定用定数
const width_full = 1124;
const width_narrow = 1079;
const x_full = 206;
const x_narrow = 218;
const x_params = 215;
const x_factor_interval = 443;
const rect_prop = {
  close: [539, 1828, 458, 132],
  whole: [x_full, 51, width_full, 1910],
  scroll: [x_narrow, 947, width_narrow, 829],
  scroll_bar: [1297, 969, 21, 787],
  icon: [347, 235, 150, 150],
  eval_val: [357, 427, 133, 37],
  speed_val: [315, 556, 103, 37],
  growth_rate: [240, 848, 89, 34],
  register_partner: [541, 880, 454, 129],
  factor_area_left: [410, -20, 437, 90],
  factor_disc_left: [427, 0, 36, 36],
  factor_icon_left: [418, -9, 54, 54],
  factor_text_left: [469, 0, 372, 33],
  header_text_result_table: [686, 74, 165, 61],
  header_text_uma_detail: [639, 74, 258, 61],
  header_text_score_info: [639, 74, 258, 61],
  header_text_score_detail: [639, 74, 258, 61],
  header_text_field: [639, 74, 258, 61],
  header_text_race_detail: [639, 74, 258, 61],
  header_text_gougai: [506, 74, 524, 61],
};
rect_prop['header'] = [rect_prop['whole'][0], rect_prop['whole'][1], rect_prop['whole'][2], 100];
rect_prop['basic_info'] = [rect_prop['header'][0], rect_prop['header'][1] + rect_prop['header'][3], rect_prop['header'][2], 700];
rect_prop['factor_disc_right'] = [rect_prop['factor_disc_left'][0] + x_factor_interval, 0, rect_prop['factor_disc_left'][2], rect_prop['factor_disc_left'][3]];
rect_prop['factor_icon_right'] = [rect_prop['factor_icon_left'][0] + x_factor_interval, 0, rect_prop['factor_icon_left'][2], rect_prop['factor_icon_left'][3]];
rect_prop['factor_text_right'] = [rect_prop['factor_text_left'][0] + x_factor_interval, 0, rect_prop['factor_text_left'][2], rect_prop['factor_text_left'][3]];

const rect_prop_dynamic = {
  with_growth_rate: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], rect_prop.header[2], rect_prop.basic_info[3] + 133],
    scroll: [x_narrow, 1076, width_narrow, rect_prop.scroll[3] - 129],
    scroll_bar: [1297, 1100, 21, 528],
  },
  with_register_partner: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], rect_prop.header[2], rect_prop.basic_info[3] + 205],
    scroll: [x_narrow, 1139, width_narrow, rect_prop.scroll[3] - 192],
    scroll_bar: [1297, 1164, 21, 592],
  },
  result_table: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], rect_prop.header[2], 641],
    scroll: [x_narrow, 792, width_narrow, rect_prop.scroll[3] + 163],
    scroll_bar: [1299, 815, 16, 945],
  },
  score_info: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], 0, 0],
    scroll: [x_narrow, 166, width_narrow, rect_prop.scroll[3] + 789],
    scroll_bar: [1293, 181, 16, 1584],
  },
  score_detail: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], rect_prop.header[2], 239],
    scroll: [x_narrow, 390, width_narrow, 1360],
    scroll_bar: [1297, 405, 16, 1345],
  },
  field: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], 0, 0],
    scroll: [x_narrow, 166, width_narrow, 1543],
    scroll_bar: [1293, 202, 16, 1563],
  },
  race_detail: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], rect_prop.header[2], 705],
    scroll: [x_narrow, 856, width_narrow, 920],
    scroll_bar: [1299, 879, 16, 874],
  },
  gougai: {
    basic_info: [rect_prop.header[0], rect_prop.header[1] + rect_prop.header[3], rect_prop.header[2], 962],
    scroll: [x_narrow, 1113, width_narrow, 665],
    scroll_bar: [1293, 202, 16, 1563],
  },
}

function add_rect_prop(rect_prop, rect_prop_dynamic, rayout_type) {
  let dict_out = {};
  Object.keys(rect_prop).forEach(function (key) {
    dict_out[key] = rect_prop[key];
  });
  if (rayout_type != 'normal') {
    Object.keys(rect_prop_dynamic[rayout_type]).forEach(function (key) {
      dict_out[key] = rect_prop_dynamic[rayout_type][key];
    });
  }
  dict_out['bottom_row'] = [rect_prop['scroll'][0], rect_prop['scroll'][1] + rect_prop['scroll'][3] - 80, rect_prop['scroll'][2], 80];
  dict_out['bottom_row_higher'] = [dict_out['bottom_row'][0], dict_out['bottom_row'][1] - 60, dict_out['bottom_row'][2], dict_out['bottom_row'][3] + 60];
  dict_out['scroll_with_header'] = [dict_out['whole'][0], dict_out['whole'][1], dict_out['whole'][2], dict_out['scroll'][1] + dict_out['scroll'][3] - dict_out['whole'][1]];
  dict_out['scroll_full_width'] = [dict_out['whole'][0], dict_out['scroll'][1], dict_out['whole'][2], dict_out['scroll'][3]];
  dict_out['tab'] = [dict_out['basic_info'][0], dict_out['basic_info'][1] + dict_out['basic_info'][3], dict_out['basic_info'][2], 70];
  dict_out['stamina_val'] = [dict_out['speed_val'][0] + x_params, dict_out['speed_val'][1], dict_out['speed_val'][2], dict_out['speed_val'][3]];
  dict_out['power_val'] = [dict_out['stamina_val'][0] + x_params, dict_out['speed_val'][1], dict_out['speed_val'][2], dict_out['speed_val'][3]];
  dict_out['guts_val'] = [dict_out['power_val'][0] + x_params, dict_out['speed_val'][1], dict_out['speed_val'][2], dict_out['speed_val'][3]];
  dict_out['int_val'] = [dict_out['guts_val'][0] + x_params, dict_out['speed_val'][1], dict_out['speed_val'][2], dict_out['speed_val'][3]];
  return dict_out
}

// しきい値
const thres_gray = 215;
const thres_cont_close = 0.1;
const thres_match_tmpl = 0.8;
// 汎用レイアウト（PC/Steam版など、テンプレ未対応UI）はマッチしきい値を緩める
const thres_match_tmpl_common = 0.5;
const thres_match_tmpl_basic_info = 0.85;
const thres_match_tmpl_higher = 0.55;
const thres_match_tmpl_rayout_type = 0.6;
const thres_match_tmpl_disc = 0.1;
const thres_match_tmpl_disc_rate = 0.85;
const thres_header = 0.9;
const thres_common_diff_y1 = 20;
const thres_common_diff_y2 = 12;
const thres_pf_rayout_diff_x = 2;
// 汎用マスク生成時の差分しきい値（0だと antialias / 描画ノイズで mask=255 になり過ぎる）
const thres_common_msk = 12;
// 重なり領域がスクロール部分のこの割合より小さいマッチは捨てる
// （サブセクションのヘッダ帯（青/ピンクの縦角丸）だけで形状一致する false positive を除外）
const thres_min_overlap_ratio = 0.18;
// 汎用レイアウト用の二段目しきい値。一覧UIは行構造が均一でTM_CCOEFF_NORMEDが
// 形状類似だけで0.6〜0.7台を出してしまうため、本物の重なり時の0.9+のみ通すよう厳しめに。
const thres_match_tmpl_common_higher = 0.85;
const thres_scroll_bar_position = 210;
const thres_scbar_h = 0.90;
const thres_1factor = 140;
const thres_1factor_color = 0.3;

// パラメータ
const all_rayout_type = ['normal', 'with_growth_rate', 'with_register_partner', 'result_table', 'score_info', 'score_detail', 'field', 'race_detail', 'gougai', 'common_scroll_only', 'common_header_scroll'];
const load_parts = ['header', 'basic_info', 'tab', 'scroll_full_width', 'scroll', 'scroll_bar', 'bottom_row', 'bottom_row_higher', 'icon', 'eval_val', 'speed_val', 'stamina_val', 'power_val', 'guts_val', 'int_val'];
const load_parts_simple = ['header', 'basic_info', 'scroll_full_width', 'scroll', 'scroll_bar', 'bottom_row', 'bottom_row_higher'];
const load_parts_more_simple = ['header', 'scroll_full_width', 'scroll', 'scroll_bar', 'bottom_row', 'bottom_row_higher'];
const load_parts_common = ['header', 'scroll_full_width', 'scroll', 'bottom_row', 'bottom_row_higher', 'footer'];
const load_parts_scroll_only = ['scroll_full_width', 'scroll', 'bottom_row', 'bottom_row_higher', 'footer'];
const load_parts_1picture = ['scroll_full_width', 'scroll', 'bottom_row', 'bottom_row_higher'];
const tgt_parts_for_group = ['icon', 'eval_val', 'speed_val', 'stamina_val', 'power_val', 'guts_val', 'int_val', 'tab'];
const load_parts_by_rayout_type = {
  'normal': load_parts,
  'with_growth_rate': load_parts,
  'with_register_partner': load_parts,
  'result_table': load_parts_simple,
  'score_info': load_parts_more_simple,
  'score_detail': load_parts_simple,
  'field': load_parts_more_simple,
  'race_detail': load_parts_simple,
  'gougai': load_parts_simple,
  'common_scroll_only': load_parts_scroll_only,
  'common_header_scroll': load_parts_common,
  'common_1picture': load_parts_1picture,
}
const diff_window_size = 32;
// PC/Steam版は検出範囲が概ねパネル境界と一致するので、
// 旧来の10%バッファだと背景の空・草・パーティクルアニメまで取り込んでしまい後段マッチを汚す
const trim_width_buffer = 0.03;

function fn_sum(arr, fn) {
  if (fn) {
    return fn_sum(arr.map(fn));
  }
  else {
    return arr.reduce(function(prev, current, i, arr) {
      return prev + current;
    });
  }
};
function fn_avg(arr, fn) {
  return fn_sum(arr, fn) / arr.length;
};
function vconcat_resize_min(im_list, interpolation = cv.INTER_CUBIC) {
  const w_min = Math.min(...im_list.map((d) => {return d.cols}));
  let im_list_resize = new cv.MatVector();
  let dsize = new cv.Size();
  for (let i = 0; i < im_list.length; i++) {
    let dst = new cv.Mat();
    dsize = new cv.Size(w_min, Math.floor(im_list[i].rows * w_min / im_list[i].cols));
    cv.resize(im_list[i], dst, dsize, 0, 0, interpolation);
    im_list_resize.push_back(dst);
    dst.delete();
  };
  let out = new cv.Mat();
  cv.vconcat(im_list_resize, out);
  im_list_resize.delete();
  return out;
};
function hconcat_resize_min(im_list, interpolation = cv.INTER_CUBIC) {
  const h_min = Math.min(...im_list.map((d) => {return d.rows}));
  let im_list_resize = new cv.MatVector();
  let dst = new cv.Mat();
  let dsize = new cv.Size();
  for (let i = 0; i < im_list.length; i++) {
    dst = new cv.Mat();
    dsize = new cv.Size(Math.floor(im_list[i].cols * h_min / im_list[i].rows), h_min);
    cv.resize(im_list[i], dst, dsize, 0, 0, interpolation);
    im_list_resize.push_back(dst);
    dst.delete();
  };
  let out = new cv.Mat();
  cv.hconcat(im_list_resize, out);
  im_list_resize.delete();
  return out;
}
function cv2_resize_fixed_aspect(img, width = -1, height = -1) {
  if (typeof img === 'undefined' || (width == -1 && height == -1)) {
    return;
  } else {
    let dst = new cv.Mat();
    let dsize = new cv.Size();
    if (width == -1) {
      dsize = new cv.Size(Math.floor(height / img.rows * img.cols), height);
    } else {
      dsize = new cv.Size(width, Math.floor(width / img.cols * img.rows));
    };
    // console.log(img.size(), '→', dsize);
    cv.resize(img, dst, dsize, 0, 0);
    return dst;
  }
}
function cv2_rectangle(img, rect, rectangle_color, line_weight) {
  let point1 = new cv.Point(rect.x, rect.y);
  let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
  cv.rectangle(img, point1, point2, rectangle_color, line_weight, cv.LINE_AA, 0);
}
function calc_rects(rect_close, rect_prop) {
  let out = {};
  let tgt_per_prop_w = rect_close.width / rect_prop.close[2]
  let tgt_per_prop_h = rect_close.height / rect_prop.close[3]
  Object.keys(rect_prop).forEach(function (k) {
    out[k] = {
      'x': Math.floor(rect_close.x + (rect_prop[k][0] - rect_prop.close[0]) * tgt_per_prop_w),
      'y': Math.floor(rect_close.y + (rect_prop[k][1] - rect_prop.close[1]) * tgt_per_prop_w),
      'width': Math.floor(rect_prop[k][2] * tgt_per_prop_w),
      'height': Math.floor(rect_prop[k][3] * tgt_per_prop_w)
    }
  });
  if ('bottom_row' in out && 'scroll' in out) {
    out.bottom_row = {
      'x': out.bottom_row.x,
      'y': out.bottom_row.y,
      'width': out.bottom_row.width,
      'height': out.scroll.y + out.scroll.height - out.bottom_row.y
    }
  }
  if ('bottom_row_higher' in out && 'scroll' in out) {
    out.bottom_row_higher = {
      'x': out.bottom_row_higher.x,
      'y': out.bottom_row_higher.y,
      'width': out.bottom_row_higher.width,
      'height': out.scroll.y + out.scroll.height - out.bottom_row_higher.y
    }
  }
  return out;
}
function match_tmpl_min_max_loc(img_tgt, img_tmpl) {
  let dst = new cv.Mat();
  let out = null;
  cv.matchTemplate(img_tgt, img_tmpl, dst, cv.TM_CCOEFF_NORMED);
  out = cv.minMaxLoc(dst);
  dst.delete();
  return out;
}
// img_msk_gray は CV_8UC1（gene_common_msk の戻り値が grayになったため、ここでは追加変換不要）
function match_tmpl_with_msk_min_max_loc(img_tgt, img_tmpl, img_msk_gray) {
  let dst = new cv.Mat();
  let out = null;
  // マスクなしと比べて遅すぎるのでモノクロで比較
  let img_tgt_gray = new cv.Mat();
  let img_tmpl_gray = new cv.Mat();
  cv.cvtColor(img_tgt, img_tgt_gray, cv.COLOR_RGBA2GRAY, 0);
  cv.cvtColor(img_tmpl, img_tmpl_gray, cv.COLOR_RGBA2GRAY, 0);
  cv.matchTemplate(img_tgt_gray, img_tmpl_gray, dst, cv.TM_CCOEFF_NORMED, img_msk_gray);
  out = cv.minMaxLoc(dst);
  dst.delete();
  img_tgt_gray.delete();
  img_tmpl_gray.delete();
  return out;
}
// gray の単チャンネルマスクを返す。呼び出し側は match_tmpl_with_msk_min_max_loc にそのまま渡せる
// しきい値0だとantialias/描画ノイズで全画素mask=255になりがちなので thres_common_msk を使う
function gene_common_msk(img_tmpl, img_tgt) {
  let img_0_gray = new cv.Mat();
  let img_1_gray = new cv.Mat();
  let tmp_diff = new cv.Mat();
  cv.cvtColor(img_tmpl, img_0_gray, cv.COLOR_RGBA2GRAY, 0);
  cv.cvtColor(img_tgt, img_1_gray, cv.COLOR_RGBA2GRAY, 0);
  cv.absdiff(img_0_gray, img_1_gray, tmp_diff);
  cv.threshold(tmp_diff, tmp_diff, thres_common_msk, 255, cv.THRESH_BINARY);
  img_0_gray.delete();
  img_1_gray.delete();
  return tmp_diff;
}
// 8bit単チャンネルMat（CV_8UC1）を pure-JS でアクセスするためのヘルパー
// ucharAt はWasm境界呼び出しが per-pixel で発生して遅いので、
// データを一度だけTypedArrayとして取得して JS 側で集計する
function row_sums_uchar(mat) {
  const rows = mat.rows;
  const cols = mat.cols;
  const data = mat.data;
  const step = mat.step[0] || cols;
  let out = new Array(rows);
  for (let i = 0; i < rows; i++) {
    let s = 0;
    const base = i * step;
    for (let j = 0; j < cols; j++) {
      s += data[base + j];
    }
    out[i] = s;
  }
  return out;
}
function col_sums_uchar(mat) {
  const rows = mat.rows;
  const cols = mat.cols;
  const data = mat.data;
  const step = mat.step[0] || cols;
  let out = new Array(cols).fill(0);
  for (let i = 0; i < rows; i++) {
    const base = i * step;
    for (let j = 0; j < cols; j++) {
      out[j] += data[base + j];
    }
  }
  return out;
}
function total_sum_uchar(mat) {
  const data = mat.data;
  const len = data.length;
  let s = 0;
  for (let i = 0; i < len; i++) s += data[i];
  return s;
}
// テンプレ画像のRGB化キャッシュ。同じテンプレを毎フレームdecode/cvtColorしないよう一度だけ用意
const _tmpl_rgb_cache = {};
function get_tmpl_rgb(id) {
  if (!_tmpl_rgb_cache[id]) {
    let m = cv.imread(document.getElementById(id));
    cv.cvtColor(m, m, cv.COLOR_RGBA2RGB, 0);
    _tmpl_rgb_cache[id] = m;
  }
  return _tmpl_rgb_cache[id];
}
// 色変換なしのraw imreadキャッシュ
const _tmpl_raw_cache = {};
function get_tmpl_raw(id) {
  if (!_tmpl_raw_cache[id]) {
    _tmpl_raw_cache[id] = cv.imread(document.getElementById(id));
  }
  return _tmpl_raw_cache[id];
}
function smoothing_list(l, window_size) {
  let out = [];
  for (let i = 0; i < l.length - window_size + 1; i++) {
    out.push(l.slice(i, i + window_size).reduce((sum, e) => sum + e, 0) / window_size);
  };
  return out;
}
function detect_common_scroll_area(l, l_smooth, window_size, mode_xy, thres_v1, thres_v2) {
  let tmp_v1 = l_smooth.findIndex(e => e > thres_v1);
  let skipped_leading_noise = false;
  if (mode_xy == 'y' && tmp_v1 == 0) {
    // PC/Steam backgrounds can animate above a modal. Ignore a tiny leading
    // diff cluster if a quiet band separates it from the real scroll content.
    let top_cluster_end = 0;
    while (top_cluster_end + 1 < l_smooth.length && l_smooth[top_cluster_end + 1] > thres_v1) {
      top_cluster_end += 1;
    }
    if (top_cluster_end < window_size) {
      let quiet_run = 0;
      for (let i = top_cluster_end + 1; i < l_smooth.length; i++) {
        if (l_smooth[i] <= thres_v2) {
          quiet_run += 1;
        } else if (quiet_run >= window_size) {
          if (l_smooth[i] > thres_v1) {
            tmp_v1 = i;
            skipped_leading_noise = true;
            break;
          }
        } else {
          quiet_run = 0;
        }
      }
    }
  }
  const tmp_v1_smooth = tmp_v1;
  if (tmp_v1 != -1) {
    tmp_v1 = l.findIndex((e, i) => i >= tmp_v1 && e > thres_v1);
  }
  let tmp_v2 = l_smooth.findLastIndex(e => e > thres_v2);
  if (skipped_leading_noise && tmp_v1_smooth != -1) {
    let active_cluster = null;
    let cluster_for_v1 = null;
    for (let i = 0; i < l_smooth.length; i++) {
      if (l_smooth[i] > thres_v2) {
        if (active_cluster == null) {
          active_cluster = {'start_i': i, 'end_i': i};
        } else {
          active_cluster.end_i = i;
        }
      } else if (active_cluster != null) {
        if (active_cluster.start_i <= tmp_v1_smooth && tmp_v1_smooth <= active_cluster.end_i) {
          cluster_for_v1 = active_cluster;
          break;
        }
        active_cluster = null;
      }
    }
    if (cluster_for_v1 == null && active_cluster != null &&
        active_cluster.start_i <= tmp_v1_smooth && tmp_v1_smooth <= active_cluster.end_i) {
      cluster_for_v1 = active_cluster;
    }
    if (cluster_for_v1 != null) {
      tmp_v2 = cluster_for_v1.end_i;
    }
  }
  if (tmp_v2 != -1) {
    tmp_v2 = l.findLastIndex((e, i) =>
      i <= tmp_v2 + window_size &&
      // e > thres_v2);
      e > thres_v2 && (
        // x軸を判定する時は追加条件なし
        (mode_xy == 'x') ||
        // y軸を判定する時はbottom_rowで参照される範囲に固定表示エリアがない
        (mode_xy == 'y' && l_smooth.slice(i - Math.floor((i - tmp_v1) / 16), i).filter(f => f <= thres_common_diff_y2).length == 0)
      )
    );
  }
  return {'v1': tmp_v1, 'v2': tmp_v2}
}
function detect_pf_rayout_scroll_area(l, l_smooth, window_size, thres_v) {
  // ググプレ版、Steam版の左右のどれか判定するため、スクロール範囲のx軸の情報を取得
  // 平滑化されたリストを先頭から参照し、0より大きい値の塊毎にその幅と合計値を集計
  // 最も大きい塊をスクロール範囲とみなす
  let l_cluster = [];
  let tmp_start_i = -1;
  l_smooth.forEach((v, i) => {
    if (v > thres_v) {
      if (tmp_start_i == -1) {
        l_cluster.push({
          'start_i': i,
          'end_i': i,
          'v_sum': v
        });
        tmp_start_i = i;
      } else {
        l_cluster[l_cluster.length - 1].end_i = i;
        l_cluster[l_cluster.length - 1].v_sum += v;
      }
    } else {
      if (tmp_start_i != -1) {
        tmp_start_i = -1;
      }
    }
  })
  if (l_cluster.length == 0) {
    // 塊を1個も発見出来なかったらエラー値で終了
    return {'v1': -1, 'v2': -1}
  }
  // 最も大きい塊をスクロール範囲とみなす
  l_cluster.sort((first, second) => second.v_sum - first.v_sum);
  console.log(l_cluster);
  // 非平滑化リスト上で正確な位置を取得
  let tmp_v1 = l_cluster[0].start_i;
  tmp_v1 = l.findIndex((e, i) => i >= tmp_v1 && e > thres_v);
  let tmp_v2 = l_cluster[0].end_i;
  tmp_v2 = l.findLastIndex((e, i) =>
      i <= tmp_v2 + window_size &&
      e > thres_v
    );
  return {'v1': tmp_v1, 'v2': tmp_v2}
}
function detect_scroll_bar_position(obj, l_smooth) {
  let tmp_y1 = l_smooth.findIndex(e => e < thres_scroll_bar_position);
  let tmp_y2 = l_smooth.findLastIndex(e => e < thres_scroll_bar_position);
  obj['scroll_bar_y'] = Math.floor((tmp_y1 + tmp_y2) / 2)
  obj['scroll_bar_h'] = Math.abs(tmp_y2 - tmp_y1)
}
function trim_by_platform(l_mat) {
  return new Promise(function(resolve){
    console.log('プラットフォーム毎のレイアウトに応じてトリミング');
    console.log('枚数:', l_mat.length, '1枚目のheight,width:', l_mat[0].rows, l_mat[0].cols);
    let l_mat_out = [];
    if (l_mat.length <= 1) {
      // 1枚だけならトリミングなし
      l_mat_out = [...l_mat];
    } else {
      // 解像度一致確認
      if (!(Math.min(...l_mat.map((d) => {return d.cols})) == Math.max(...l_mat.map((d) => {return d.cols})) &&
          Math.min(...l_mat.map((d) => {return d.rows})) == Math.max(...l_mat.map((d) => {return d.rows})))) {
        throw new Error('The loaded images have different resolutions.');
      }
      // 縦長ならトリミングなし
      if (l_mat[0].cols < l_mat[0].rows) {
        console.log('縦長画像のためトリミングをキャンセルします');
        l_mat_out = [...l_mat];
      } else {
        // 横長ならググプレかSteamの左右どっちかスクロール範囲から判定
        // 1枚目と2枚目以降を比較してスクロール箇所を特定
        let img_0_gray = l_mat[0].clone();
        cv.cvtColor(img_0_gray, img_0_gray, cv.COLOR_RGBA2GRAY, 0);
        let img_i_gray = new cv.Mat();
        let tmp_diff = new cv.Mat();
        let tmp_x1 = img_0_gray.cols;
        let tmp_x2 = 0;
        let tmp_sum = 0;
        let img_diff_sum = new cv.Mat();
        let mask = new cv.Mat();
        let dtype = -1;
        l_mat.slice(1).forEach((mat, n) => {
          // 2枚目以降を1枚目と比較し差分範囲を取得、全画像の差異を合計
          cv.cvtColor(mat, img_i_gray, cv.COLOR_RGBA2GRAY, 0);
          cv.absdiff(img_0_gray, img_i_gray, tmp_diff);
          if (n == 0) {
            tmp_diff.copyTo(img_diff_sum);
          } else {
            cv.add(tmp_diff, img_diff_sum, img_diff_sum, mask, dtype);
          }
        })
        // 2値化
        cv.adaptiveThreshold(img_diff_sum, img_diff_sum, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
        cv.bitwise_not(img_diff_sum, img_diff_sum);
        // 一列毎に差異を合計してheightで標準化
        const _h = img_diff_sum.rows;
        let l_sum_diff_by_x = col_sums_uchar(img_diff_sum).map(s => s / _h);
        // 結果の平滑化
        let l_sum_diff_by_x_smooth = smoothing_list(l_sum_diff_by_x, diff_window_size);
        // console.log(l_sum_diff_by_x.join('\n'));
        // console.log(l_sum_diff_by_x.map((e, i) => e + '\t' + l_sum_diff_by_x_smooth[Math.min(i, l_sum_diff_by_x_smooth.length - 1)]).join('\n'));
        // console.log(l_sum_diff_by_x_smooth.join('\n'));
        // 平滑化した結果を参考に外れ値を除外しつつスクロール範囲をぴったり検索
        let tmp_area_x = detect_pf_rayout_scroll_area(l_sum_diff_by_x, l_sum_diff_by_x_smooth, diff_window_size, thres_pf_rayout_diff_x);
        console.log(tmp_area_x);
        if (tmp_area_x.v1 == -1) {
          // スクロール範囲が特定出来なかったらエラー終了
          throw new Error('Could not determine the scroll area. You may have selected the same image twice.');
        }
        // 取得した範囲の左右にバッファを持たせる
        tmp_x1 = Math.max(0, Math.floor(tmp_area_x.v1 - (tmp_area_x.v2 - tmp_area_x.v1) * trim_width_buffer));
        tmp_x2 = Math.min(img_0_gray.cols - 1, Math.floor(tmp_area_x.v2 + (tmp_area_x.v2 - tmp_area_x.v1) * trim_width_buffer));
        console.log(new cv.Rect(tmp_x1, 0, tmp_x2 - tmp_x1, img_0_gray.rows));
        l_mat.forEach(m => {
          l_mat_out.push(m.roi(new cv.Rect(tmp_x1, 0, tmp_x2 - tmp_x1, img_0_gray.rows)).clone())
        })
        img_0_gray.delete();
        img_i_gray.delete();
        tmp_diff.delete();
        img_diff_sum.delete();
        mask.delete();
      }
    }
    resolve(l_mat_out);
  })
}
function detect_rects(img_in) {
  let mv_contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  let mv_contours_only_large = new cv.MatVector();
  let rayout_type = 'none';
  let rects = {};

  // Canny法でエッジ検出
  let img_gray = img_in.clone();
  cv.cvtColor(img_gray, img_gray, cv.COLOR_RGBA2GRAY, 0);
  cv.Canny(img_gray, img_gray, 50, 200, 3);
  let img_gray_half = img_gray.roi(new cv.Rect(0, Math.floor(img_in.rows / 2), img_in.cols, img_in.rows - Math.floor(img_in.rows / 2)));

  // 入力画像で輪郭抽出
  cv.findContours(img_gray_half, mv_contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE, new cv.Point(0, Math.floor(img_in.rows / 2)));
  // 小さい輪郭は除外して再格納
  for (let i = 0; i < mv_contours.size(); i++) {
    if (cv.contourArea(mv_contours.get(i)) > (Math.min(img_gray_half.cols, img_gray_half.rows) ** 2) / 80) {
      mv_contours_only_large.push_back(mv_contours.get(i));
      // console.log(cv.contourArea(mv_contours.get(i)), (Math.min(img_gray_half.cols, img_gray_half.rows) ** 2) / 80);
    }
  };
  img_gray.delete();

  // 二値化でエッジ検出
  img_gray = img_in.clone();
  cv.cvtColor(img_gray, img_gray, cv.COLOR_RGBA2GRAY, 0);
  let ksize = new cv.Size(5, 5);
  cv.GaussianBlur(img_gray, img_gray, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.threshold(img_gray, img_gray, thres_gray, 255, cv.THRESH_BINARY);
  img_gray_half = img_gray.roi(new cv.Rect(0, Math.floor(img_in.rows / 2), img_in.cols, img_in.rows - Math.floor(img_in.rows / 2)));

  // 入力画像で輪郭抽出
  cv.findContours(img_gray_half, mv_contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE, new cv.Point(0, Math.floor(img_in.rows / 2)));
  // 小さい輪郭は除外して再格納
  for (let i = 0; i < mv_contours.size(); i++) {
    if (cv.contourArea(mv_contours.get(i)) > (Math.min(img_gray_half.cols, img_gray_half.rows) ** 2) / 80) {
      mv_contours_only_large.push_back(mv_contours.get(i));
      // console.log(cv.contourArea(mv_contours.get(i)), (Math.min(img_gray_half.cols, img_gray_half.rows) ** 2) / 80);
    }
  };

  // console.log(mv_contours.size(), mv_contours_only_large.size());
  if (mv_contours_only_large.size() == 0) {
    throw new Error('Could not detect the close button in one of the images.');
  };

  // 閉じるボタンテンプレ読み込み
  let tmpl_gray = cv.imread(document.getElementById('tmplClose'));
  cv.cvtColor(tmpl_gray, tmpl_gray, cv.COLOR_RGBA2GRAY, 0);
  cv.GaussianBlur(tmpl_gray, tmpl_gray, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.threshold(tmpl_gray, tmpl_gray, thres_gray, 255, cv.THRESH_BINARY);
  let mv_tmpl_contours = new cv.MatVector();
  let tmpl_hierarchy = new cv.Mat();
  // 閉じるボタン輪郭抽出
  cv.findContours(tmpl_gray, mv_tmpl_contours, tmpl_hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
  // 小さい輪郭は除外して配列に再格納
  let l_tmpl_contours_only_large = [];
  for (let i = 0; i < mv_tmpl_contours.size(); i++) {
    if (cv.contourArea(mv_tmpl_contours.get(i)) > (Math.min(tmpl_gray.cols, tmpl_gray.rows) ** 2) / 80) {
      l_tmpl_contours_only_large.push(mv_tmpl_contours.get(i));
    }
  };
  // 大きい順に2番目のを閉じるボタンの輪郭として採用
  l_tmpl_contours_only_large.sort((first, second) => cv.contourArea(second) - cv.contourArea(first));
  let msk_close = l_tmpl_contours_only_large[1];
  // console.log(cv.boundingRect(msk_close));

  // テンプレと比較して閉じるボタンの輪郭だけ抽出
  let cont_out = [];
  let info_out = [];
  let is_close_val = 1.0;
  let min_is_close_val = 1.0;
  let only_matched = true;
  for (let i = 0; i < mv_contours_only_large.size(); i++) {
    is_close_val = cv.matchShapes(mv_contours_only_large.get(i), msk_close, cv.CONTOURS_MATCH_I3, 0);
    // console.log('is_close_val: ', is_close_val);
    if (!only_matched) {
      cont_out.push(mv_contours_only_large.get(i));
      info_out.push({
        'index': i,
        'is_close': is_close_val < thres_cont_close,
        'is_close_val': is_close_val
      });
    } else if (is_close_val < thres_cont_close && is_close_val < min_is_close_val) {
      let tmp_rect = cv.boundingRect(mv_contours_only_large.get(i));
      if (tmp_rect.width > tmp_rect.height) {
        // 類似度がしきい値より高いかつ現時点最高かつ閉じるボタン(仮)が横長ならリスト更新
        cont_out.shift();
        info_out.shift();
        cont_out.push(mv_contours_only_large.get(i));
        info_out.push({
          'index': i,
          'is_close': true,
          'is_close_val': is_close_val
        });
        min_is_close_val = is_close_val;
      }
    }
  };
  // console.log(cont_out, info_out);
  if (cont_out.length == 0) {
    // 汎用連結処理に回すためレイアウトタイプ=unknownで終了
    rayout_type = 'unknown';
    // throw new Error('閉じるボタンが正常に検出出来ない画像があります。');
  } else {
    let rect_close = cv.boundingRect(cont_out[0]);
    // 閉じるが横にズレていた時のため座標をセンタリングは廃止
    // rect_close.x = Math.round(img_in.cols / 2 - rect_close.width / 2);
    // 一度wholeの枠座標を計算
    let rect_whole = calc_rects(rect_close, {'whole': rect_prop.whole, 'close': rect_prop.close});
    // console.log(rect_close);
    // console.log(rect_whole);

    // ヘッダー部分がどのyから始まってるか調査
    let y_start = Math.max(0, Math.floor(rect_whole.whole.y - rect_whole.whole.height / 20));
    let tmp_rect = new cv.Rect(rect_whole.whole.x, y_start, rect_whole.whole.width, Math.floor(rect_whole.whole.height / 10));
    if (tmp_rect.y + tmp_rect.height > img_in.rows || tmp_rect.x + tmp_rect.width > img_in.cols || tmp_rect.x < 0 || tmp_rect.y < 0) {
      // 汎用連結処理に回すためレイアウトタイプ=unknownで終了
      rayout_type = 'unknown';
      // throw new Error('閉じるボタンが正しく検出出来ない画像があります。');
    } else {
      let img_find_header = img_in.roi(new cv.Rect(rect_whole.whole.x, y_start, rect_whole.whole.width, Math.floor(rect_whole.whole.height / 10))).clone();
      cv.cvtColor(img_find_header, img_find_header, cv.COLOR_RGB2HSV, 0);
      let green = new cv.Mat();
      let green_lo = new cv.Mat(img_find_header.rows, img_find_header.cols, img_find_header.type(), [20, 150, 0, 0]);
      let green_hi = new cv.Mat(img_find_header.rows, img_find_header.cols, img_find_header.type(), [60, 255, 255, 0]);
      // ヘッダー辺りで緑っぽいピクセルを抽出
      cv.inRange(img_find_header, green_lo, green_hi, green);
      green_lo.delete();
      green_hi.delete();

      // 上から見ていってほぼ全セルが緑っぽい行(＝ウマ娘詳細ヘッダーの始まり)をy_actに格納
      let y_act = rect_whole.whole.y;
      const green_row_sums = row_sums_uchar(green);
      const green_thres_sum = thres_header * green.cols * 255;
      for (let i = 0; i < green.rows; i++) {
        if (green_row_sums[i] > green_thres_sum) {
          y_act = y_start + i;
          break;
        }
      }

      // 発見したヘッダー開始位置に合わせてrect_closeを調整
      let height_act = rect_whole.whole.height - (y_act - rect_whole.whole.y)
      let act_rate = height_act / rect_whole.whole.height
      // console.log(rect_close);
      rect_close = {
        'x': rect_close.x + (rect_close.width * (1 - act_rate)) / 2,
        'y': rect_close.y + (rect_close.height * (1 - act_rate)) / 2,
        'width': rect_close.width * act_rate,
        'height': rect_close.height * act_rate,
      };
      // console.log(rect_close);
      // 枠座標を再計算
      let rects_base = calc_rects(rect_close, rect_prop);
      // レイアウトを取得
      let arr_rayout_score = [];

      // 1パターン分のスコアを算出してリーク無しで開放するヘルパー
      const score_layout = (rayout_name, rect, tmpl_id) => {
        let img_tgt = img_in.roi(new cv.Rect(Math.max(rect.x - 2, 0), Math.max(rect.y - 2, 0), rect.width + 4, rect.height + 4));
        const img_tmpl_cached = get_tmpl_rgb(tmpl_id);
        let tmp_dst = new cv.Mat();
        cv.resize(img_tmpl_cached, tmp_dst, new cv.Size(rect.width, rect.height), 0, 0);
        const score = match_tmpl_min_max_loc(img_tgt, tmp_dst).maxVal;
        img_tgt.delete();
        tmp_dst.delete();
        return {'rayout_type': rayout_name, 'score': score};
      };

      arr_rayout_score.push(score_layout('result_table',  rects_base.header_text_result_table,  'tmplHeaderTextResultTable'));
      arr_rayout_score.push(score_layout('score_info',    rects_base.header_text_score_info,    'tmplHeaderTextScoreInfo'));
      arr_rayout_score.push(score_layout('uma_detail',    rects_base.header_text_score_detail,  'tmplHeaderTextUmaDetail'));
      arr_rayout_score.push(score_layout('score_detail',  rects_base.header_text_score_detail,  'tmplHeaderTextScoreDetail'));
      arr_rayout_score.push(score_layout('field',         rects_base.header_text_field,         'tmplHeaderTextField'));
      arr_rayout_score.push(score_layout('race_detail',   rects_base.header_text_race_detail,   'tmplHeaderTextRaceDetail'));
      arr_rayout_score.push(score_layout('gougai',        rects_base.header_text_gougai,        'tmplHeaderTextGougai'));

      // 最もスコアの高いレイアウトを選択、しきい値より高ければ採用
      arr_rayout_score.sort((a, b) => b.score - a.score);
      // console.log(arr_rayout_score);
      if (arr_rayout_score[0].score > thres_match_tmpl_rayout_type) {
        rayout_type = arr_rayout_score[0].rayout_type;
      } else {
        // 汎用連結処理に回すためレイアウトタイプ=unknownで終了
        rayout_type = 'unknown';
      }

      if (rayout_type == 'uma_detail') {
        // ウマ娘詳細画面の中でレイアウト特定
        arr_rayout_score = [];
        arr_rayout_score.push(score_layout('with_growth_rate',       rects_base.growth_rate,      'tmplGrowthRate'));
        arr_rayout_score.push(score_layout('with_register_partner',  rects_base.register_partner, 'tmplRegisterPartner'));
        arr_rayout_score.push(score_layout('with_unregister_partner', rects_base.register_partner, 'tmplUnregisterPartner'));

        // 最もスコアの高いレイアウトを選択、しきい値より高ければ採用
        arr_rayout_score.sort((a, b) => b.score - a.score);
        if (arr_rayout_score[0].score > thres_match_tmpl_rayout_type) {
          // パートナー解除ボタン付きはパートナー登録ボタン付きとレイアウト同じなので読み替え
          rayout_type = arr_rayout_score[0].rayout_type;
          if (rayout_type == 'with_unregister_partner') {
            rayout_type = 'with_register_partner';
          }
        } else {
          rayout_type = 'normal';
        }
      }
      img_find_header.delete();
      green.delete();

      if (rayout_type != 'unknown') {
        let rect_prop_added = add_rect_prop(rect_prop, rect_prop_dynamic, rayout_type);
        rects = calc_rects(rect_close, rect_prop_added);
        // console.log(rayout_type);
        // console.log(rects);
        // console.log(rects.whole);
        if (!(
          0 <= rects.whole.x &&
          0 <= rects.whole.y &&
          rects.whole.x + rects.whole.width <= img_in.cols &&
          rects.whole.y + rects.whole.height <= img_in.rows)) {
        throw new Error('Could not correctly detect the Uma Musume detail area in one of the images.');
        }
        // 輪郭描画
        // let dst = cv.Mat.zeros(img_gray.rows, img_gray.cols, cv.CV_8UC3);
        // let dst = img_in.clone();
        // cv.cvtColor(dst, dst, cv.COLOR_RGBA2RGB, 0);
        // for (let i = 0; i < mv_contours_only_large.size(); ++i) {
        //     let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
        //                               Math.round(Math.random() * 255));
        //     cv.drawContours(dst, mv_contours_only_large, i, color, 2, cv.LINE_8);
        // };
        // cv2_rectangle(dst, rects.whole, new cv.Scalar(255, 0, 0), 1);
        // let tmpCanvasElement = document.createElement('canvas');
        // tmpCanvasElement.setAttribute('id', 'canvasOutput');
        // document.getElementById('overview').appendChild(tmpCanvasElement);
        // cv.imshow('canvasOutput', dst);
      }
    }
  }

  // メモリ解放
  // cont_out / l_tmpl_contours_only_large は MatVector が所有しているMatの参照なので、
  // MatVector.delete() に任せて二重解放を避ける
  img_gray.delete();
  img_gray_half.delete();
  mv_contours.delete();
  hierarchy.delete();
  mv_contours_only_large.delete();
  tmpl_gray.delete();
  mv_tmpl_contours.delete();
  tmpl_hierarchy.delete();
  // console.log({'rayout_type': rayout_type, 'rects': rects});
  return {'rayout_type': rayout_type, 'rects': rects};
}
function get_rects(l_mat) {
  return new Promise(function(resolve){
    const n_tgt = l_mat.length;
    console.log('閉じるボタン位置取得');
    // console.log('枚数:', l_mat.length, '1枚目のheight,width:', l_mat[0].rows, l_mat[0].cols);
    let l_rects = [];
    let tmp_rects = {};
    for (let i = 0; i < l_mat.length; i++) {
      // 画像毎に閉じるボタンの検出と枠座標取得
      tmp_rects = detect_rects(l_mat[i]);
      l_rects.push(tmp_rects);
    }
    console.log(l_rects);
    resolve(l_rects);
  })
}
function get_unknown_rects(l_mat, l_rects) {
  return new Promise(function(resolve){
    console.log('レイアウト不明画像について汎用処理でスクロール範囲特定');
    let l_index_tgt = [...Array(l_rects.length).keys()].filter((e) => l_rects[e].rayout_type == 'unknown')
    // console.log(l_index_tgt);
    // 画像中央の16:9部分だけ切り出しは廃止
    // let tmp_w = Math.min(l_mat[l_index_tgt[0]].cols, Math.floor(l_mat[l_index_tgt[0]].rows / 16 * 9));
    if (l_index_tgt.length == 1) {
      // unknownが1枚だけなら全面スクロール範囲扱いで枠座標出力
      l_rects[l_index_tgt[0]].rayout_type = 'common_1picture';
      l_rects[l_index_tgt[0]].rects.scroll_full_width = {
        'x': 0,
        'y': 0,
        'width': l_mat[l_index_tgt[0]].cols,
        'height': l_mat[l_index_tgt[0]].rows
      };
    } else {
      // unknownが2枚以上のとき
      let img_0_gray = l_mat[l_index_tgt[0]].clone();
      cv.cvtColor(img_0_gray, img_0_gray, cv.COLOR_RGBA2GRAY, 0);
      let img_i_gray = new cv.Mat();
      let tmp_diff = new cv.Mat();
      let tmp_y1 = img_0_gray.rows;
      let tmp_y2 = 0;
      let tmp_x1 = img_0_gray.cols;
      let tmp_x2 = 0;
      let tmp_sum = 0;
      l_index_tgt.slice(1).forEach(function(i){
        // 2枚目以降を1枚目と比較し差分範囲を取得
        cv.cvtColor(l_mat[i], img_i_gray, cv.COLOR_RGBA2GRAY, 0);
        cv.absdiff(img_0_gray, img_i_gray, tmp_diff);

        // trim_by_platform()でx軸方向はトリミング済だからここではトリミングしない
        tmp_x1 = 0;
        tmp_x2 = tmp_diff.cols;

        // 一行毎に差異を合計してwidthで標準化
        // tmp_x1=0, tmp_x2=cols なので row_sums で全幅集計
        const _w_band = tmp_x2 - tmp_x1;
        let l_sum_diff_by_y = row_sums_uchar(tmp_diff).map(s => s / _w_band);
        // 結果の平滑化
        let l_sum_diff_by_y_smooth = smoothing_list(l_sum_diff_by_y, diff_window_size);
        // console.log(l_sum_diff_by_y.join('\n'));
        // console.log(l_sum_diff_by_y.map((e, i) => e + '\t' + l_sum_diff_by_y_smooth[Math.min(i, l_sum_diff_by_y_smooth.length - 1)]).join('\n'));
        // console.log(l_sum_diff_by_y_smooth.join('\n'));
        // 平滑化した結果を参考に外れ値を除外しつつスクロール範囲をぴったり検索
        let tmp_area = detect_common_scroll_area(l_sum_diff_by_y, l_sum_diff_by_y_smooth, diff_window_size, 'y', thres_common_diff_y1, thres_common_diff_y2);
        // console.log(tmp_area);
        if (tmp_area.v1 != -1) {
          // スクロール範囲が見つかったら上書き、見つからなければ完全一致画像として何もしない
          tmp_y1 = Math.min(tmp_y1, tmp_area.v1);
          tmp_y2 = Math.max(tmp_y2, tmp_area.v2);
        }
      })
      // console.log(tmp_x1, tmp_x2, tmp_y1, tmp_y2);

      // 全部のunknown画像で一番広いスクロール範囲を採用して各画像のrectsを生成
      l_index_tgt.forEach(function(i){
        if (tmp_y1 == 0) {
          l_rects[i].rayout_type = 'common_scroll_only';
        } else {
          l_rects[i].rayout_type = 'common_header_scroll';
          l_rects[i].rects.header = {
            'x': tmp_x1,
            'y': 0,
            'width': tmp_x2 - tmp_x1,
            'height': tmp_y1
          };
        }
        l_rects[i].rects.scroll_full_width = {
          'x': tmp_x1,
          'y': tmp_y1,
          'width': tmp_x2 - tmp_x1,
          'height': tmp_y2 - tmp_y1
        };
        // フッターはスクロール部の下全部
        l_rects[i].rects.footer = {
          'x': tmp_x1,
          'y': tmp_y2,
          'width': tmp_x2 - tmp_x1,
          'height': l_mat[i].rows - tmp_y2
        };
      })

      img_0_gray.delete();
      img_i_gray.delete();
      tmp_diff.delete();
    }
    // scroll_full_width以外を生成
    l_index_tgt.forEach(function(i){
      // scrollはscroll_full_widthと同じ扱い
      l_rects[i].rects.scroll = l_rects[i].rects.scroll_full_width;
      // bottom_rowは全体の下部1/8
      l_rects[i].rects.bottom_row = {
        'x': l_rects[i].rects.scroll_full_width.x,
        'y': l_rects[i].rects.scroll_full_width.y + l_rects[i].rects.scroll_full_width.height - Math.floor(l_rects[i].rects.scroll_full_width.height / 8),
        'width': l_rects[i].rects.scroll_full_width.width,
        'height': Math.floor(l_rects[i].rects.scroll_full_width.height / 8)
      };
      // bottom_row_higherは全体の下部1/4
      l_rects[i].rects.bottom_row_higher = {
        'x': l_rects[i].rects.scroll_full_width.x,
        'y': l_rects[i].rects.scroll_full_width.y + l_rects[i].rects.scroll_full_width.height - Math.floor(l_rects[i].rects.scroll_full_width.height / 4),
        'width': l_rects[i].rects.scroll_full_width.width,
        'height': Math.floor(l_rects[i].rects.scroll_full_width.height / 4)
      };
    })
    resolve();
  })
}
function trim_parts(l_mat, l_rects) {
  return new Promise(function(resolve){
    console.log('閉じるボタンを基準に各パーツ切り出し');
    const n_tgt = l_mat.length;
    // レイアウトxパーツ毎の最小サイズを算出
    let tgt_sizes = {};
    // console.log(l_rects);
    all_rayout_type.forEach(function(r){
      if (l_rects.filter((e) => e.rayout_type == r).length > 0) {
        tgt_sizes[r] = {};
        load_parts_by_rayout_type[r].forEach(function(p){
          // console.log(r, p)
          let tmp_w = Math.min(...l_rects.filter((e) => e.rayout_type == r).map((d) => {return d.rects[p].width}));
          let tmp_h = Math.min(...l_rects.filter((e) => e.rayout_type == r).map((d) => {return d.rects[p].height}));
          tgt_sizes[r][p] = {'width': tmp_w, 'height': tmp_h};
        })
      }
    });
    // 最小サイズに合わせて全パーツを切り出し
    let imgs = [];
    l_mat.forEach(function(m, i){
      let obj_tmp = {};
      let tgt_load_parts = load_parts_by_rayout_type[l_rects[i].rayout_type];
      tgt_load_parts.forEach(function(p){
        // console.log(Object.keys(l_rects[i].rects));
        let tmp_mat = m.roi(l_rects[i].rects[p]).clone();
        let tmp_dst = new cv.Mat();
        cv.resize(tmp_mat, tmp_dst, tgt_sizes[l_rects[i].rayout_type][p]);
        obj_tmp[p] = tmp_dst;
        tmp_mat.delete();
      });
      obj_tmp['rayout_type'] = l_rects[i].rayout_type;
      // スクロールバーがあればそれの高さを取得
      if (tgt_load_parts.includes('scroll_bar')) {
        // console.log(l_rects[i].rects['scroll_bar']);
        let img_scroll_bar_gray = obj_tmp['scroll_bar'].clone();
        cv.cvtColor(img_scroll_bar_gray, img_scroll_bar_gray, cv.COLOR_RGBA2GRAY, 0);

        const _sb_w = img_scroll_bar_gray.cols;
        let l_sum_val_by_y = row_sums_uchar(img_scroll_bar_gray).map(s => s / _sb_w);
        img_scroll_bar_gray.delete();
        // スクロールバーの中央と長さを取得して格納
        detect_scroll_bar_position(obj_tmp, l_sum_val_by_y);
      }
      imgs.push(obj_tmp);
    });
    resolve(imgs);
  })
}
function get_group_list(imgs, l_rects) {
  return new Promise(function(resolve){
    const n_tgt = imgs.length;
    // グループ番号をnullで初期化
    let l_group = Array(n_tgt).fill(null);
    {
      // 各画像の組み合わせ毎の一致度を格納する二次元配列宣言
      // 似てると1、似てないと0なので1.0で初期化
      let arr_val = new Array(n_tgt);
      for(let y = 0; y < n_tgt; y++) {
        arr_val[y] = new Array(n_tgt).fill(1.0);
      }
      // アイコン等からグループ決め
      // 全組み合わせでテンプレートマッチ
      // matchTemplate は target に対して template が小さい必要があるので、各imgの各パーツを「1px shaved」した
      // テンプレ用ROIを画像毎に1度だけ作って使い回す（旧コードはペア毎にcloneしていた）
      const _shaved_tmpl_cache = imgs.map(() => ({}));
      const get_shaved_tmpl = (img_idx, part) => {
        if (!_shaved_tmpl_cache[img_idx][part]) {
          const m = imgs[img_idx][part];
          // roi はビューを返すので img の生存中は有効。clone は不要
          _shaved_tmpl_cache[img_idx][part] = m.roi(new cv.Rect(0, 0, Math.max(m.cols - 1, 1), Math.max(m.rows - 1, 1)));
        }
        return _shaved_tmpl_cache[img_idx][part];
      };
      const score_pair = (i, j, parts) => {
        let v = 1.0;
        parts.forEach((p) => {
          v *= match_tmpl_min_max_loc(imgs[j][p], get_shaved_tmpl(i, p)).maxVal;
        });
        arr_val[Math.min(i, j)][Math.max(i, j)] = v;
      };

      imgs.forEach(function(img_tmpl, i){
        imgs.forEach(function(img_tgt, j){
          // 同じ組み合わせで二回チェックしないようjの方が大きい時
          // かつ両者のレイアウトタイプが一致する時だけチェック
          // i == jの時は同じ画像同士=100%一致なので無視
          if (i < j) {
            if (l_rects[i].rayout_type != l_rects[j].rayout_type) {
              // レイアウトタイプが異なっていたら100%別グループとして0を強制代入
              arr_val[Math.min(i, j)][Math.max(i, j)] = 0;
            } else if (['score_info', 'field', 'common_header_scroll'].includes(l_rects[i].rayout_type)) {
              // ヘッダーを持つレイアウトはヘッダーで比較
              score_pair(i, j, ['header']);
            } else if (['result_table', 'score_detail', 'race_detail', 'gougai'].includes(l_rects[i].rayout_type)) {
              // 基本情報欄を持つレイアウトは基本情報欄で比較
              score_pair(i, j, ['basic_info']);
            } else if (['common_scroll_only'].includes(l_rects[i].rayout_type)) {
              // スクロール範囲しかないものはレイアウトタイプが一致していれば強制的に100%同じグループとして1を強制代入
              arr_val[Math.min(i, j)][Math.max(i, j)] = 1;
            } else {
              // パーツ毎にテンプレートマッチ
              score_pair(i, j, tgt_parts_for_group);
            }
          }
        })
      });
      // shaved roi はビューなので、生Mat側を解放する前にここでクリーンアップ
      _shaved_tmpl_cache.forEach((per_img) => {
        Object.values(per_img).forEach((m) => m.delete());
      });
      console.log(arr_val);
      let current_group = -1;
      [...Array(n_tgt).keys()].forEach(function(i){
        if (l_group[i] == null) {
          current_group += 1;
          l_group[i] = current_group;
          for (let j = i + 1; j < n_tgt; j++) {
            if (l_group[j] == null && arr_val[i][j] > thres_match_tmpl_basic_info) {
              l_group[j] = current_group;
            }
          }
        }
      })
    };
    // console.log(l_group);
    resolve(l_group);
  })
}
function get_order_by_scbar(imgs, l_rects, l_group) {
  return new Promise(function(resolve){
    const n_tgt = imgs.length;
    // グループ毎に処理
    [...Array(Math.max(...l_group) + 1).keys()].forEach(function(current_group){
      let l_tmp_scbar_y = [];
      let l_tmp_scbar_h = [];
      let n_tmp = 0;
      imgs.forEach(function(img_tgt, i){
        if (l_group[i] == current_group) {
          n_tmp += 1;
          if ('scroll_bar_y' in img_tgt) {
            if (img_tgt['scroll_bar_y'] != -1) {
              l_tmp_scbar_y.push({'index': i, 'scroll_bar_y': img_tgt['scroll_bar_y']})
              l_tmp_scbar_h.push(img_tgt['scroll_bar_h'])
            }
          } else {
            img_tgt['scroll_bar_y'] = -1
            img_tgt['scroll_bar_h'] = -1
          }
        }
      })

      // スクロールバーの位置が不明な画像が一つでもあれば全部ポジション不明扱い
      // またはスクロールバーの長さがそこそこ一致してないと全部ポジション不明扱い
      // console.log(l_tmp_scbar_y);
      // console.log(l_tmp_scbar_h);
      if (n_tmp != l_tmp_scbar_y.length || Math.min(...l_tmp_scbar_h) / Math.max(...l_tmp_scbar_h) < thres_scbar_h) {
        imgs.forEach(function(img_tgt, i){
          if (l_group[i] == current_group) {
            img_tgt['position_by_scbar'] = -1
          }
        })
      } else {
        // ソートして順序をimgsに返す
        l_tmp_scbar_y.sort((first, second) => first['scroll_bar_y'] - second['scroll_bar_y']);
        l_tmp_scbar_y.forEach(function(tmp_scbar_y, i){
          imgs[tmp_scbar_y['index']]['position_by_scbar'] = i
        })
      }
    })

    // console.log(l_order_by_scbar_by_group);
    resolve();
  })
}
function match_one_line(imgs, l_group, arr_val, arr_loc, i) {
  return new Promise(function(resolve){
    let img_tmpl = imgs[i];
    let simple_rayout = ['result_table', 'score_info', 'score_detail', 'field', 'race_detail', 'gougai'];
    let did_scbar_fallback = false;
    imgs.forEach(function(img_tgt, j){
      let is_neighbor_by_scbar = false;
      let is_tgt = false;
      // 同じ画像ではなく、かつ同じグループであり、スクロールバーに基づく順序があるならそれが隣接していたら比較開始
      if (i != j && l_group[i] == l_group[j]) {
        is_tgt = true;
        if (img_tmpl['position_by_scbar'] != -1) {
          if (img_tgt['position_by_scbar'] == img_tmpl['position_by_scbar'] + 1) {
            is_neighbor_by_scbar = true;
          }
        }
      }
      // console.log(i, j, is_tgt, is_neighbor_by_scbar, is_tgt && (img_tmpl['position_by_scbar'] == -1 || is_neighbor_by_scbar))
      if (is_tgt && (img_tmpl['position_by_scbar'] == -1 || is_neighbor_by_scbar)) {
        let res = {};
        let tmp_sign = 0;
        if (simple_rayout.includes(img_tmpl.rayout_type)) {
          // シンプルレイアウトなら比較範囲を拡大
          res = match_tmpl_min_max_loc(img_tgt.scroll, img_tmpl.bottom_row_higher);
        } else if (['common_header_scroll', 'common_scroll_only'].includes(img_tmpl.rayout_type)) {
          // 汎用レイアウトならマスクを用いて比較
          let img_msk = gene_common_msk(img_tmpl.bottom_row, img_tgt.bottom_row);
          res = match_tmpl_with_msk_min_max_loc(img_tgt.scroll, img_tmpl.bottom_row, img_msk);
          img_msk.delete();
        } else {
          res = match_tmpl_min_max_loc(img_tgt.scroll, img_tmpl.bottom_row);
        }
        // 1行分の範囲でヒットしたら重なってるはずのエリアで改めてヒットするか確認
        // 汎用レイアウト（PC/Steam英語版など）はテンプレ未対応で全体的にスコアが低めに出るため、
        // しきい値を緩めて拾う。後段の thres_match_tmpl_higher で再検証されるので誤検出リスクは限定的。
        const is_common = ['common_header_scroll', 'common_scroll_only'].includes(img_tmpl.rayout_type);
        const cur_thres = is_common ? thres_match_tmpl_common : thres_match_tmpl;
        if (arr_val[Math.min(i, j)][Math.max(i, j)] < res.maxVal && cur_thres < res.maxVal) {
          // console.log(i, j);
          let dist = 0;
          if (simple_rayout.includes(img_tmpl.rayout_type)) {
            dist = img_tgt.scroll.rows - img_tmpl.bottom_row_higher.rows - res.maxLoc.y;
          } else {
            dist = img_tgt.scroll.rows - img_tmpl.bottom_row.rows - res.maxLoc.y;
          }
          let tmp_img_tgt = new cv.Mat();
          let tmp_img_tmpl = new cv.Mat();
          if (i >= j) {
            dist *= -1;
          }
          if (dist < 0) {
            tmp_sign = 1
          } else {
            tmp_sign = -1
          }
          tmp_img_tgt = img_tmpl.scroll.roi(new cv.Rect(0, dist * tmp_sign * -1, img_tmpl.scroll.cols, img_tmpl.scroll.rows + dist * tmp_sign)).clone();
          tmp_img_tmpl = img_tgt.scroll.roi(new cv.Rect(0, 0, img_tgt.scroll.cols, img_tgt.scroll.rows + dist * tmp_sign)).clone();

          let tmp_res = match_tmpl_min_max_loc(tmp_img_tgt, tmp_img_tmpl);
          // console.log(i, j, res.maxVal, tmp_res.maxVal, dist);
          // 汎用レイアウト時、重なり領域がスクロール部分の thres_min_overlap_ratio より小さければ捨てる
          // （サブセクション・ヘッダ帯だけで形状一致するfalse positiveを除外）
          const overlap_h = img_tmpl.scroll.rows - Math.abs(dist);
          const min_overlap_h = Math.floor(img_tmpl.scroll.rows * thres_min_overlap_ratio);
          const skip_for_small_overlap = is_common && overlap_h < min_overlap_h;
          // 汎用レイアウトは均一行レイアウトでcross-correlationが高めに出てしまうため、
          // 本物の重なり（0.9+）のみ採用する
          const cur_higher = is_common ? thres_match_tmpl_common_higher : thres_match_tmpl_higher;
          if (cur_higher < tmp_res.maxVal && !skip_for_small_overlap) {
            arr_val[Math.min(i, j)][Math.max(i, j)] = res.maxVal;
            arr_loc[Math.min(i, j)][Math.max(i, j)] = dist;
          }
          tmp_img_tmpl.delete();
          tmp_img_tgt.delete();
        }
        // もし隣接しているはずなのに相対距離が出てない、または上下逆に繋がってたら、真下に単純連結出来る距離を入力
        // console.log(is_neighbor_by_scbar, i, j, arr_val[Math.min(i, j)][Math.max(i, j)], arr_loc[Math.min(i, j)][Math.max(i, j)], arr_val[Math.min(i, j)][Math.max(i, j)] == 0.0)
        if (i <= j) {
          tmp_sign = 1;
        } else {
          tmp_sign = -1;
        }
        if (is_neighbor_by_scbar && (arr_val[Math.min(i, j)][Math.max(i, j)] == 0.0 || arr_loc[Math.min(i, j)][Math.max(i, j)] * tmp_sign < 0)) {
          did_scbar_fallback = true;
          arr_val[Math.min(i, j)][Math.max(i, j)] = 1.0;
          arr_loc[Math.min(i, j)][Math.max(i, j)] = img_tgt.scroll.rows * tmp_sign;
          // console.log(is_neighbor_by_scbar, i, j, arr_val[Math.min(i, j)][Math.max(i, j)], arr_loc[Math.min(i, j)][Math.max(i, j)])
        }
      }
    })
    resolve(did_scbar_fallback);
  })
}

function get_relative_dist(arr_val, arr_loc, l_group) {
  return new Promise(function(resolve){
    const n_tgt = arr_val.length;
    console.log('各グループの先頭画像からの相対距離を算出')
    // 各グループの先頭画像からの相対距離を算出
    let l_relative_height = new Array(n_tgt).fill(null);
    let l_relative_height_score = new Array(n_tgt).fill(0.0);
    let l_isfinished = new Array(n_tgt).fill(false);
    let n_finished_before = -1;
    let n_finished = 0;
    // グループ毎に処理
    [...Array(Math.max(...l_group) + 1).keys()].forEach(function(current_group){
      let i_most_certain = 0;
      // 基準となる最も確実性の高いペアの上側の画像を探す
      let l_val = [];
      [...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group).forEach(function(i){
        [...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group).forEach(function(j){
          l_val.push({'i': i, 'j': j, 'val': arr_val[i][j], 'loc': arr_loc[i][j]});
        })
      })
      l_val.sort((first, second) => second['val'] - first['val']);
      if (l_val[0]['loc'] >= 0) {
        i_most_certain = l_val[0]['i'];
      } else {
        i_most_certain = l_val[0]['j'];
      }
      // console.log(i_most_certain);

      // 相対座標計算開始
      let is_group_initialized = false;
      while (true) {
        n_finished_before = n_finished;
        // 今のグループだけ処理
        [...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group).forEach(function(y){
          // 基準画像までスキップ
          if (!is_group_initialized && y == i_most_certain) {
            l_relative_height[y] = 0;
            l_relative_height_score[y] = 1;
            is_group_initialized = true;
          }
          // 初期化されていてかつ相対座標が決まってたら、まだ決まってない他の画像に波及開始
          if (is_group_initialized && !l_isfinished[y] && l_relative_height[y] != null) {
            [...Array(n_tgt).keys()].forEach(function(i){
              [...Array(n_tgt).keys()].forEach(function(j){
                if (arr_loc[i][j] != 0 && l_group[i] == current_group && l_group[j] == current_group) {
                  let tmp_relative_height_score = Math.min(l_relative_height_score[y], arr_val[i][j]);
                  if (i < y && j == y && l_relative_height_score[i] < tmp_relative_height_score) {
                    l_relative_height[i] = l_relative_height[y] - arr_loc[i][j];
                    l_relative_height_score[i] = tmp_relative_height_score;
                    l_isfinished[i] = false;
                    // console.log([y, i, j, true, ...l_isfinished, ...l_relative_height, ...l_relative_height_score].join('\t'));
                  } else if (i == y && j > y && l_relative_height_score[j] < tmp_relative_height_score) {
                    l_relative_height[j] = l_relative_height[y] + arr_loc[i][j];
                    l_relative_height_score[j] = tmp_relative_height_score;
                    l_isfinished[j] = false;
                    // console.log([y, i, j, false, ...l_isfinished, ...l_relative_height, ...l_relative_height_score].join('\t'));
                  }
                }
              })
            })
            l_isfinished[y] = true
          }
        })
        // 全部チェックし終えたか更新出来なくなったら終了
        n_finished = l_isfinished.filter((d) => d).length;
        if (n_finished == n_tgt || n_finished_before == n_finished) {
          break;
        }
      }
      // 最も上の画像に対する相対座標に変換
      let min_relative_height = Math.min(...l_relative_height.filter((d, i) => l_group[i] == current_group));
      // console.log(l_relative_height, min_relative_height);
      for (let i = 0; i < l_relative_height.length; i++) {
        if(l_group[i] == current_group && l_relative_height[i] != null) {
          l_relative_height[i] -= min_relative_height;
        }
      }
    })
    console.log(l_relative_height);
    resolve(l_relative_height);
  })
}
function align_missing_imgs(l_relative_height, l_group, imgs) {
  return new Promise(function(resolve){
    // console.log(l_relative_height);
    const n_tgt = imgs.length;
    console.log('位置が取得出来なかった画像を取り込み順に基づいて配置');
    if (l_relative_height.filter((d) => d == null).length) {
      raiseNormalMsg('Some images could not be aligned by content. They were placed in the order you loaded them.');
      // グループ毎に処理
      [...Array(Math.max(...l_group) + 1).keys()].forEach(function(current_group){
        // 当グループのインデックスを取得
        const idx_in_group = [...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group);
        // マッチで位置が決まっている画像のインデックス
        const idx_matched = idx_in_group.filter((i) => l_relative_height[i] != null);
        // 未マッチのインデックス（取り込み順を保つ）
        const idx_unmatched = idx_in_group.filter((i) => l_relative_height[i] == null);
        if (idx_unmatched.length === 0) return;

        if (idx_matched.length === 0) {
          // 全部未マッチなら単純に取り込み順に縦積み
          let next_rh = 0;
          idx_unmatched.forEach(function(i){
            l_relative_height[i] = next_rh;
            next_rh += imgs[i].scroll.rows;
          });
          return;
        }

        // マッチ済画像の取り込み順での最小・最大インデックス
        const min_matched = Math.min(...idx_matched);
        const max_matched = Math.max(...idx_matched);
        const min_rh = Math.min(...idx_matched.map((i) => l_relative_height[i]));
        const max_rh = Math.max(...idx_matched.map((i) => l_relative_height[i]));
        const idx_max_rh = idx_matched.find((i) => l_relative_height[i] === max_rh);

        // 取り込み順で最初のマッチ画像より前にあるものは「上に」積む（取り込み順を保ったまま）
        const before = idx_unmatched.filter((i) => i < min_matched).sort((a, b) => a - b);
        // 取り込み順で最後のマッチ画像より後にあるものは「下に」積む
        const after = idx_unmatched.filter((i) => i > max_matched).sort((a, b) => a - b);
        // 中間のものは末尾に追加（位置情報がないため）
        const middle = idx_unmatched.filter((i) => i > min_matched && i < max_matched).sort((a, b) => a - b);

        // 「上に」積む: 取り込み順を保つため、min_matched から逆順に下から上へ配置
        let cur_rh = min_rh;
        for (let k = before.length - 1; k >= 0; k--) {
          const i = before[k];
          cur_rh -= imgs[i].scroll.rows;
          l_relative_height[i] = cur_rh;
        }
        // 「下に」積む
        cur_rh = max_rh + imgs[idx_max_rh].scroll.rows;
        for (let k = 0; k < after.length; k++) {
          const i = after[k];
          l_relative_height[i] = cur_rh;
          cur_rh += imgs[i].scroll.rows;
        }
        // 「中間」のもの: 末尾にまとめて追加
        for (let k = 0; k < middle.length; k++) {
          const i = middle[k];
          l_relative_height[i] = cur_rh;
          cur_rh += imgs[i].scroll.rows;
        }
      });
      // 最も上の画像を 0 にするため、最小値で正規化
      [...Array(Math.max(...l_group) + 1).keys()].forEach(function(current_group){
        const min_rh = Math.min(...l_relative_height.filter((d, i) => l_group[i] == current_group));
        for (let i = 0; i < l_relative_height.length; i++) {
          if (l_group[i] == current_group && l_relative_height[i] != null) {
            l_relative_height[i] -= min_rh;
          }
        }
      });
    }
    // console.log(l_relative_height);
    resolve(l_relative_height);
  })
}
function generateReceipt(imgs, l_group, l_relative_height) {
  return new Promise(function(resolve){
    const n_tgt = imgs.length;

    // グループ毎に縦に繋げて最後に横につなげる
    let imgs_tmp = [];
    [...Array(Math.max(...l_group) + 1).keys()].forEach(function(current_group){
      // 今のグループに属する画像のインデックス一覧を取得
      let l_index = [...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group && l_relative_height[d] != null);
      // 相対座標が低い順にソート
      l_index.sort((first, second) => l_relative_height[first] - l_relative_height[second]);
      let imgs_part = new cv.MatVector();
      let is_header = true;
      let relative_height_before = 0;
      l_index.forEach(function(i){
        // 各グループの先頭はヘッダー部分付き
        if (is_header) {
          imgs_part.push_back(imgs[i].scroll_with_header);
          is_header = false;
          relative_height_before = l_relative_height[i];
        } else {
          let img_tmp = imgs[i].scroll_full_width;
          let y = Math.floor(imgs[i].scroll.rows - (l_relative_height[i] - relative_height_before));
          let tmp_rect = new cv.Rect(0, y, img_tmp.cols, img_tmp.rows - y);
          let img_tmp_part = img_tmp.roi(tmp_rect);
          imgs_part.push_back(img_tmp_part.clone());
          relative_height_before = l_relative_height[i];
          img_tmp_part.delete();
        }
      });
      // はぐれがいたら末尾にトリミングなしで追加
      if ([...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group && l_relative_height[d] == null).length > 0) {
        raiseNormalMsg('Some images had no detectable overlap and were concatenated in the order they were loaded.');
        [...Array(n_tgt).keys()].filter((d) => l_group[d] == current_group && l_relative_height[d] == null).forEach(function(i){
          imgs_part.push_back(imgs[i].scroll_full_width);
        });
      }
      // 出力用配列に格納
      imgs_tmp.push(imgs_part.clone());
      // メモリ解放
      imgs_part.delete();
    });

    // 上下左右連結は外側で
    resolve(imgs_tmp);
  })
}
function gamma_correction(canvas_in, gamma_val) {
  let canvas_out = document.createElement('canvas');
  canvas_out.width = canvas_in.width;
  canvas_out.height = canvas_in.height;

  let ctx = canvas_in.getContext('2d');
  let c_src = ctx.getImageData(0, 0, canvas_in.width, canvas_in.height);
  let c_dst = ctx.createImageData(canvas_in.width, canvas_in.height);
  let int_g = 0.1;
  const correctify = val => 255 * Math.pow(val / 255, 1 / gamma_val);
  for (let i = 0; i < c_src.data.length; i += 4) {
    c_dst.data[i] = correctify(c_src.data[i]);
    c_dst.data[i + 1] = correctify(c_src.data[i + 1]);
    c_dst.data[i + 2] = correctify(c_src.data[i + 2]);
    c_dst.data[i + 3] = c_src.data[i + 3];
  }
  canvas_out.getContext('2d').putImageData(c_dst, 0, 0);
  return canvas_out;
}
function detectFactor_by_gamma(eles_scroll_canvas) {
  let l_out = [];
  // 因子1枠テンプレ画像読み込み
  let ele_tmpl_1factor = document.getElementById('tmpl1Factor');
  let canvas_tmpl_1factor = document.createElement('canvas');
  canvas_tmpl_1factor.width = ele_tmpl_1factor.naturalWidth;
  canvas_tmpl_1factor.height = ele_tmpl_1factor.naturalHeight;
  // テンプレ画像をキャンバスに書き込み
  canvas_tmpl_1factor.getContext('2d').drawImage(ele_tmpl_1factor, 0, 0);
  canvas_tmpl_1factor = gamma_correction(canvas_tmpl_1factor, 0.1);
  // テンプレ画像で特徴点検出
  let src_tmpl = cv.imread(canvas_tmpl_1factor);
  cv.cvtColor(src_tmpl, src_tmpl, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src_tmpl, src_tmpl, thres_1factor, 255, cv.THRESH_BINARY);
  let mv_tmpl_contours = new cv.MatVector();
  let mv_tmpl_hierarchy = new cv.Mat();
  cv.findContours(src_tmpl, mv_tmpl_contours, mv_tmpl_hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
  // 小さい輪郭は除外して配列に再格納
  let l_tmpl_contours_only_large = [];
  for (let i = 0; i < mv_tmpl_contours.size(); i++) {
    if (cv.contourArea(mv_tmpl_contours.get(i)) > (Math.min(src_tmpl.cols, src_tmpl.rows) ** 2) / 50) {
      l_tmpl_contours_only_large.push(mv_tmpl_contours.get(i));
    }
  };
  // 大きい順に2番目のを因子1枠の輪郭として採用
  l_tmpl_contours_only_large.sort((first, second) => cv.contourArea(second) - cv.contourArea(first));
  // mv_tmpl_contours の所有なので、MatVector開放後も使えるようclone
  let msk_1factor = l_tmpl_contours_only_large[1].clone();
  mv_tmpl_contours.delete();
  mv_tmpl_hierarchy.delete();
  src_tmpl.delete();
  canvas_tmpl_1factor.remove();

  let l_scroll_canvas = Array.from(eles_scroll_canvas);
  // グループ毎に処理
  l_scroll_canvas.forEach((sc) => {
    let img_src = cv.imread(sc);
    let l_tmp = [];
    // ガンマ補正
    let tmpCanvasElement = gamma_correction(sc, 0.1);

    // ガンマ補正後のスクロール部を使って特徴点マッチング
    let img_src_gamma = cv.imread(tmpCanvasElement);
    cv.cvtColor(img_src_gamma, img_src_gamma, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(img_src_gamma, img_src_gamma, thres_1factor, 255, cv.THRESH_BINARY);
    let mv_contours = new cv.MatVector();
    let mv_hierarchy = new cv.Mat();
    cv.findContours(img_src_gamma, mv_contours, mv_hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
    for (let i = 0; i < mv_contours.size(); ++i) {
      // 小さい領域は無視
      if (cv.contourArea(mv_contours.get(i)) > (Math.min(img_src_gamma.cols, img_src_gamma.rows) ** 2) / 50) {
        let is_close_val = cv.matchShapes(mv_contours.get(i), msk_1factor, cv.CONTOURS_MATCH_I3, 0);
        if (is_close_val < thres_cont_close) {
          let tmp_rect = cv.boundingRect(mv_contours.get(i));
          let tmp_scale = tmp_rect.width / rect_prop.factor_area_left[2];
          let tmp_dic = {
            rect_factor_disc: {
              left: tmp_rect.x + Math.floor((rect_prop.factor_disc_left[0] - rect_prop.factor_area_left[0]) * tmp_scale),
              top: tmp_rect.y + Math.floor((rect_prop.factor_disc_left[1] - rect_prop.factor_area_left[1]) * tmp_scale),
              width: Math.floor(rect_prop.factor_disc_left[2] * tmp_scale),
              height: Math.floor(rect_prop.factor_disc_left[3] * tmp_scale)
            },
            // アイコンの座標は盾の中心がまるポチと同じになるように
            rect_factor_icon: {
              left: tmp_rect.x + Math.floor((rect_prop.factor_icon_left[0] - rect_prop.factor_area_left[0]) * tmp_scale),
              top: tmp_rect.y + Math.floor((rect_prop.factor_icon_left[1] - rect_prop.factor_area_left[1]) * tmp_scale),
              width: Math.floor(rect_prop.factor_icon_left[2] * tmp_scale),
              height: Math.floor(rect_prop.factor_icon_left[3] * tmp_scale)
            },
            rect_factor_text: {
              left: tmp_rect.x + Math.floor((rect_prop.factor_text_left[0] - rect_prop.factor_area_left[0]) * tmp_scale),
              top: tmp_rect.y + Math.floor((rect_prop.factor_text_left[1] - rect_prop.factor_area_left[1]) * tmp_scale),
              width: Math.floor(rect_prop.factor_text_left[2] * tmp_scale),
              height: Math.floor(rect_prop.factor_text_left[3] * tmp_scale)
            }
          }

          // ちゃんと因子欄か丸ポチの有無で確認
          // 因子のまるポチのテンプレートはキャッシュから取得し、サイズに合わせてresize
          const tmpl_factor_disc_src = get_tmpl_raw('tmplFactorDisc');
          let tmpl_factor_disc = new cv.Mat();
          cv.resize(tmpl_factor_disc_src, tmpl_factor_disc, new cv.Size(tmp_dic.rect_factor_disc.width, tmp_dic.rect_factor_disc.height), 0, 0, cv.INTER_CUBIC);

          // 丸ポチ部分でテンプレートマッチ
          // しきい値以上だったら因子名読み込み対象に追加
          let img_tgt = img_src.roi(new cv.Rect(Math.max(tmp_dic.rect_factor_disc.left - 1, 0), Math.max(tmp_dic.rect_factor_disc.top - 1, 0), tmp_dic.rect_factor_disc.width + 2, tmp_dic.rect_factor_disc.height + 2)).clone();
          if (match_tmpl_min_max_loc(img_tgt, tmpl_factor_disc).maxVal > thres_match_tmpl_disc) {
            // 塗りつぶし色を確認して赤青緑因子を除外
            let l_res_color = [];
            let img_1factor = img_src.roi(tmp_rect).clone();
            cv.cvtColor(img_1factor, img_1factor, cv.COLOR_RGB2HSV, 0);
            l_res_color.push({'color': 'red', 'val': calc_color_rate(img_1factor, [155, 100, 0, 0], [175, 205, 255, 0])});
            // l_res_color.push({'color': 'red', 'val': calc_color_rate(img_1factor, [0, 100, 0, 0], [15, 205, 255, 0])});
            l_res_color.push({'color': 'blue', 'val': calc_color_rate(img_1factor, [90, 150, 0, 0], [110, 255, 255, 0])});
            l_res_color.push({'color': 'green', 'val': calc_color_rate(img_1factor, [30, 150, 0, 0], [50, 255, 255, 0])});
            l_res_color.sort((first, second) => second['val'] - first['val']);
            // 三色どれもしきい値以下なら白因子扱い
            if (l_res_color[0]['val'] > thres_1factor_color) {
              tmp_dic['bg_color'] = l_res_color[0]['color'];
              tmp_dic['bg_color_val'] = l_res_color[0]['val'];
            } else {
              tmp_dic['bg_color'] = 'white';
              tmp_dic['bg_color_val'] = 1;
            }
            // console.log(tmp_rect, tmp_dic['bg_color'], tmp_dic['bg_color_val']);
            l_tmp.push(tmp_dic);
            img_1factor.delete();
          }
          tmpl_factor_disc.delete();
          img_tgt.delete();
        }
      }
    }
    // console.log(l_tmp);
    l_out.push(l_tmp);
    mv_contours.delete();
    mv_hierarchy.delete();
    img_src.delete();
    img_src_gamma.delete();
    tmpCanvasElement.remove();
  })
  msk_1factor.delete();
  return l_out;
}
function calc_color_rate(img_in, hsv_from, hsv_to) {
  let img_rgb = new cv.Mat();
  let lo = new cv.Mat(img_in.rows, img_in.cols, img_in.type(), hsv_from);
  let hi = new cv.Mat(img_in.rows, img_in.cols, img_in.type(), hsv_to);
  cv.inRange(img_in, lo, hi, img_rgb);
  lo.delete();
  hi.delete();

  const tmp_sum = total_sum_uchar(img_rgb);
  const val_out = tmp_sum / (255 * img_rgb.rows * img_rgb.cols);
  img_rgb.delete();
  return val_out;
}
// jpn言語モデルのロードはMB単位で重いので、ワーカは1度作って使い回す
let _tesseract_worker_promise = null;
function get_tesseract_worker() {
  if (!_tesseract_worker_promise) {
    _tesseract_worker_promise = (async () => {
      const w = await Tesseract.createWorker({
        workerPath: "https://unpkg.com/tesseract.js@4.1.1/dist/worker.min.js",
      });
      await w.loadLanguage('eng');
      await w.initialize('eng', 3);
      return w;
    })();
  }
  return _tesseract_worker_promise;
}
function ocr_factor_text(eles_scroll_canvas, l_detected_factor) {
  return new Promise(async function(resolve){
    let l_scroll_canvas = Array.from(eles_scroll_canvas);
    const min_height_factor_text = 30;

    let l_skillnames = Object.keys(dict_skills);
    l_skillnames = l_skillnames.map(d => d.split('')).flat();
    let char_whitelist = [...new Set(l_skillnames)].join('') + '◯〇';
    // console.log(char_whitelist);

    const worker = await get_tesseract_worker();
    // await worker.setParameters({tessedit_char_whitelist: char_whitelist});
    for (let i = 0; i < l_detected_factor.length; i++) {
      for (let j = 0; j < l_detected_factor[i].length; j++) {
        let tmp_factor = l_detected_factor[i][j];
        if (tmp_factor.bg_color == 'white') {
          const tmpCanvasElement = document.createElement('canvas');
          // tmpCanvasElement.setAttribute('id', 'tmpCanvasElement' + i);
          const w = Math.max(tmp_factor.rect_factor_text.width, Math.floor(tmp_factor.rect_factor_text.width / tmp_factor.rect_factor_text.height * min_height_factor_text));
          const h = Math.max(tmp_factor.rect_factor_text.height, min_height_factor_text);
          tmpCanvasElement.width = w;
          tmpCanvasElement.height = h;
          tmpCanvasElement.getContext('2d').drawImage(
            l_scroll_canvas[i],
            tmp_factor.rect_factor_text.left,
            tmp_factor.rect_factor_text.top,
            tmp_factor.rect_factor_text.width,
            tmp_factor.rect_factor_text.height,
            0, 0, w, h);
          const data = await worker.recognize(tmpCanvasElement, {});
          // console.log(data);
          tmpCanvasElement.remove();
          // console.log(text);
          tmp_factor['factor_text'] = normalize_text(data.data.text, regexps);
          // exact match failed -> snap to the closest known skill name (if close enough)
          const matched_skill = find_closest_skill(tmp_factor.factor_text);
          if (matched_skill !== null) {
            tmp_factor['factor_text'] = matched_skill;
          }

          //アイコン描画
          let skill_icon_id = '';
          if (tmp_factor.factor_text in dict_skills) {
            skill_icon_id = 'skillIcon' + dict_skills[tmp_factor.factor_text].iconId;
          } else {
            skill_icon_id = 'skillIconUnknown';
          }
          // dict entry without a matching <img> -> fall back to the unknown icon instead of throwing
          const ele_skill_icon = document.getElementById(skill_icon_id) || document.getElementById('skillIconUnknown');
          l_scroll_canvas[i].getContext('2d').drawImage(
            ele_skill_icon,
            tmp_factor.rect_factor_icon.left,
            tmp_factor.rect_factor_icon.top,
            tmp_factor.rect_factor_icon.width,
            tmp_factor.rect_factor_icon.height,
          )
        }
      }
    }
    // ワーカはキャッシュ。terminateせずに次回呼び出しまで保持
    resolve(l_detected_factor);
  })
}
function levenshtein(a, b) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let prev = Array.from({length: b.length + 1}, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[b.length];
}
// aptitude marker (○ ◎ ×) is only 1 char away from its siblings, so it is split off
// and must match exactly; only the skill name part is matched fuzzily
const SKILL_MARKER_RE = /\s*([○◎×])$/;
function split_skill_marker(s) {
  const m = s.match(SKILL_MARKER_RE);
  return m ? {base: s.slice(0, m.index), marker: m[1]} : {base: s, marker: ''};
}
let _skill_index = null;
function get_skill_index() {
  if (!_skill_index) {
    _skill_index = Object.keys(dict_skills).map(key => {
      const {base, marker} = split_skill_marker(key);
      return {key, base, lower: base.toLowerCase(), marker, iconId: dict_skills[key].iconId};
    });
  }
  return _skill_index;
}
// Returns the dict_skills key closest to `text`, or null if there is no confident match.
// Exact matches are returned as-is. Ambiguous ties between different icons return null.
function find_closest_skill(text) {
  if (text === '' || text in dict_skills) return text === '' ? null : text;
  const {base, marker} = split_skill_marker(text);
  const lower = base.toLowerCase();
  // allow ~20% of characters to be wrong, at least 1 edit for anything but very short names
  const max_dist = base.length < 4 ? 0 : Math.max(1, Math.floor(base.length * 0.2));
  let best = null;
  let best_dist = Infinity;
  let ambiguous = false;
  for (const cand of get_skill_index()) {
    if (cand.marker !== marker) continue;
    if (Math.abs(cand.lower.length - lower.length) > max_dist) continue;
    const d = levenshtein(lower, cand.lower);
    if (d > max_dist) continue;
    if (d < best_dist) {
      best = cand;
      best_dist = d;
      ambiguous = false;
    } else if (d === best_dist && best !== null && cand.iconId !== best.iconId) {
      // 'Best Day Ever' vs 'Best day ever' style pairs: prefer the case-sensitive closer one
      const d_best = levenshtein(base, best.base);
      const d_cand = levenshtein(base, cand.base);
      if (d_cand < d_best) {
        best = cand;
      } else if (d_cand === d_best) {
        ambiguous = true;
      }
    }
  }
  return best !== null && !ambiguous ? best.key : null;
}
function normalize_text(text, regexps) {
  if (typeof text === 'undefined') {
    return ''
  } else {
    let t = text;
    t = hankaku2Zenkaku(t);
    regexps.forEach(r => {
      while (true) {
        let t_tmp = t.replace(r.pattern, r.rep);
        if (t == t_tmp) {
          break;
        } else {
          // console.log(t_tmp, t);
          t = t_tmp;
        }
      }
    })
    // console.log(text, t);
    return t
  }
}
function hankaku2Zenkaku(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}
