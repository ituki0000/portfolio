document.addEventListener('DOMContentLoaded', () => {
  /* =============================
   * 技術スタック棒グラフ
   * ===========================*/
  const chartConfigs = [
    {
      id: 'chartLang',
      labels: ['HTML/CSS', 'Python', 'JavaScript', 'Kotlin', 'Java', 'TypeScript', 'C#'],
      data:   [3, 3, 2.5, 1.5, 2, 0.1, 0.1]
    },
    {
      id: 'chartFw',
      labels: ['Tailwind CSS', 'React', 'Node.js', 'Flask', 'Next.js', 'chakra-ui', 'Unity'],
      data:   [0.85, 0.8, 0.75, 0.7, 0.7, 0.75, 0.6]
    },
    {
      id: 'chartTool',
      labels: ['phpMyAdmin', 'MySQL', 'SQLite', 'Linux'],
      data:   [3, 3, 1, 0.3]
    }
  ];

  chartConfigs.forEach(cfg => {
    const el = document.getElementById(cfg.id);
    if (el) {
      // ラベルと年数をペアにして降順ソート
      const sorted = cfg.labels.map((label, i) => ({ label, val: cfg.data[i] }))
        .sort((a, b) => b.val - a.val);

      const labelsSorted = sorted.map(item => item.label);
      const dataSorted = sorted.map(item => item.val);

      new Chart(el, {
        type: 'bar',
        data: {
          labels: labelsSorted,
          datasets: [{
            label: '経験年数',
            data: dataSorted,
            backgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: '年数' }
            }
          },
          plugins: { legend: { display: false } },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  });

  /* =============================
   * モーダル開閉処理
   * ===========================*/
  // 作品カードのモーダル
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'flex';
    });
  });

  // 趣味のモーダル
  document.querySelectorAll('.clickable[data-modal]').forEach(clickable => {
    clickable.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'flex';
    });
  });

  // モーダルを閉じる処理
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });

  // モーダル外クリックで閉じる
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // タイムラインの「もっと見る」機能
  const showMoreBtn = document.getElementById('showMoreTimeline');
  const timelinePast = document.querySelector('.timeline-past');

  if (showMoreBtn && timelinePast) {
    const moreText = showMoreBtn.querySelector('.more-text');
    const lessText = showMoreBtn.querySelector('.less-text');
    const moreIcon = showMoreBtn.querySelector('.more-icon');
    const lessIcon = showMoreBtn.querySelector('.less-icon');

    showMoreBtn.addEventListener('click', function() {
      const isExpanded = timelinePast.classList.contains('show');
      
      if (isExpanded) {
        timelinePast.style.display = 'none';
        timelinePast.classList.remove('show');
        moreText.style.display = 'inline';
        lessText.style.display = 'none';
        moreIcon.style.display = 'inline';
        lessIcon.style.display = 'none';
      } else {
        timelinePast.style.display = 'block';
        timelinePast.classList.add('show');
        moreText.style.display = 'none';
        lessText.style.display = 'inline';
        moreIcon.style.display = 'none';
        lessIcon.style.display = 'inline';
        
        // スムーズスクロール
        timelinePast.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}); 