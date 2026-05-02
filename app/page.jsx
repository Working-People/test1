"use client";

import { useMemo, useState } from "react";

const products = [
  {
    name: "ESP32-WROOM-32E 无线模块",
    category: "无线模块",
    price: 18.9,
    stock: 1280,
    hot: 98,
    proto: true,
    desc: "双核 MCU，支持 Wi-Fi 与蓝牙，适合物联网网关和传感节点。",
    specs: ["3.3V", "240MHz", "PCB 天线", "16MB Flash"],
    art: "module"
  },
  {
    name: "STM32F103C8T6 开发板",
    category: "开发板",
    price: 22.5,
    stock: 640,
    hot: 91,
    proto: true,
    desc: "经典 ARM Cortex-M3 最小系统板，适合教学、验证和嵌入式项目。",
    specs: ["72MHz", "64KB Flash", "Micro USB", "GPIO x37"],
    art: "board"
  },
  {
    name: "BME280 温湿压传感器",
    category: "传感器",
    price: 12.8,
    stock: 384,
    hot: 87,
    proto: true,
    desc: "I2C/SPI 数字传感器，适合环境监测、气象站和低功耗设备。",
    specs: ["I2C/SPI", "1.8-3.6V", "湿度 ±3%", "压力 ±1hPa"],
    art: "sensor"
  },
  {
    name: "AMS1117-3.3 稳压芯片",
    category: "电源管理",
    price: 0.38,
    stock: 8200,
    hot: 76,
    proto: false,
    desc: "常用 LDO 线性稳压器，适合小电流 3.3V 供电设计。",
    specs: ["SOT-223", "3.3V", "1A Max", "低噪声"],
    art: "chip"
  },
  {
    name: "0603 10K 精密电阻包",
    category: "被动元件",
    price: 3.2,
    stock: 12000,
    hot: 74,
    proto: false,
    desc: "1% 精度贴片电阻，批量维修、打样和实验室备料都很顺手。",
    specs: ["0603", "10KΩ", "1%", "100pcs"],
    art: "resistor"
  },
  {
    name: "100uF 25V 低 ESR 电解电容",
    category: "被动元件",
    price: 0.72,
    stock: 5300,
    hot: 68,
    proto: false,
    desc: "电源滤波和纹波抑制常用规格，适合 DC-DC 输出端。",
    specs: ["100uF", "25V", "低 ESR", "105°C"],
    art: "capacitor"
  },
  {
    name: "TB6612FNG 双路电机驱动",
    category: "驱动芯片",
    price: 8.6,
    stock: 312,
    hot: 82,
    proto: true,
    desc: "双 H 桥驱动模块，可控制两路直流电机或一路步进电机。",
    specs: ["1.2A", "2.7-10.8V", "PWM", "小车常用"],
    art: "driver"
  },
  {
    name: "5mm 高亮 LED 混色套装",
    category: "光电器件",
    price: 6.9,
    stock: 2300,
    hot: 64,
    proto: true,
    desc: "红绿蓝黄白五色组合，适合指示灯、实验课和快速打样。",
    specs: ["5 色", "100pcs", "直插", "高亮"],
    art: "led"
  },
  {
    name: "USB-C 16Pin 母座",
    category: "连接器",
    price: 1.15,
    stock: 1750,
    hot: 79,
    proto: false,
    desc: "沉板式 Type-C 接口，适用于充电、供电和轻量数据连接。",
    specs: ["16Pin", "SMT", "耐插拔", "沉板"],
    art: "connector"
  }
];

const categories = [...new Set(products.map((product) => product.category))];

function ProductIcon({ type }) {
  const icons = {
    module: (
      <>
        <rect x="28" y="24" width="104" height="72" rx="8" fill="#0f766e" />
        <rect x="42" y="38" width="44" height="32" rx="4" fill="#17202c" />
        <path d="M98 42h20M98 56h20M98 70h20" stroke="#ccfbf1" strokeWidth="4" strokeLinecap="round" />
        <path d="M38 102h84" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    board: (
      <>
        <rect x="22" y="22" width="116" height="76" rx="10" fill="#16a34a" />
        <rect x="50" y="42" width="46" height="30" rx="5" fill="#111827" />
        <circle cx="38" cy="38" r="6" fill="#bbf7d0" />
        <circle cx="122" cy="82" r="6" fill="#bbf7d0" />
        <path d="M28 104h104" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    sensor: (
      <>
        <rect x="42" y="28" width="76" height="64" rx="8" fill="#2563eb" />
        <circle cx="80" cy="60" r="20" fill="#dbeafe" />
        <circle cx="80" cy="60" r="8" fill="#2563eb" />
        <path d="M52 102h56" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
    chip: (
      <>
        <rect x="48" y="34" width="64" height="52" rx="6" fill="#1f2937" />
        <path d="M34 42h14M34 56h14M34 70h14M112 42h14M112 56h14M112 70h14" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
        <path d="M66 58h28" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
    resistor: (
      <>
        <path d="M24 62h32M104 62h32" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
        <rect x="56" y="44" width="48" height="36" rx="18" fill="#f59e0b" />
        <path d="M68 45v34M80 45v34M92 45v34" stroke="#7c2d12" strokeWidth="5" />
      </>
    ),
    capacitor: (
      <>
        <path d="M56 96V30M104 96V30" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
        <rect x="46" y="20" width="68" height="74" rx="14" fill="#334155" />
        <path d="M58 34h18M58 48h18" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
    driver: (
      <>
        <rect x="36" y="30" width="88" height="58" rx="8" fill="#7c3aed" />
        <rect x="58" y="44" width="44" height="30" rx="5" fill="#111827" />
        <path d="M30 100h100M44 24v12M116 24v12" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />
      </>
    ),
    led: (
      <>
        <path d="M80 78v24M62 98h36" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
        <path d="M52 58a28 28 0 1 1 56 0v16H52V58Z" fill="#facc15" />
        <path d="M62 44c8-10 23-12 34-2" stroke="#fff7ed" strokeWidth="5" strokeLinecap="round" />
      </>
    ),
    connector: (
      <>
        <rect x="38" y="42" width="84" height="36" rx="10" fill="#475569" />
        <rect x="54" y="52" width="52" height="16" rx="8" fill="#e2e8f0" />
        <path d="M46 86h68" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
      </>
    )
  };

  return (
    <svg className="component-svg" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      {icons[type] ?? icons.chip}
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stockOnly, setStockOnly] = useState(false);
  const [protoOnly, setProtoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sorters = {
      popular: (a, b) => b.hot - a.hot,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      stockDesc: (a, b) => b.stock - a.stock
    };

    return [...products]
      .filter((product) => {
        const searchableText = `${product.name} ${product.category} ${product.desc} ${product.specs.join(" ")}`.toLowerCase();
        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesStock = !stockOnly || product.stock > 0;
        const matchesProto = !protoOnly || product.proto;

        return matchesQuery && matchesCategory && matchesStock && matchesProto;
      })
      .sort(sorters[sortBy]);
  }, [protoOnly, query, selectedCategories, sortBy, stockOnly]);

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

  function toggleCategory(category) {
    setSelectedCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category]
    );
  }

  function setQuickFilter(category) {
    setSelectedCategories([category]);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="topbar">
        <nav className="nav" aria-label="主导航">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" fill="currentColor" />
              </svg>
            </span>
            <span>VoltMart 元器件</span>
          </div>

          <label className="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="search" placeholder="搜索芯片、传感器、电容、电阻..." value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
          </label>

          <button className="cart-pill" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6h15l-2 8H8L6 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
            </svg>
            <span>购物车 {cart.length}</span>
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1>VoltMart 电子元器件商城</h1>
            <p>面向工程师、创客和维修工作室的一站式采购页面：常用芯片、模块、传感器、被动元件现货展示，按项目快速选型。</p>
            <div className="hero-actions">
              <button className="primary" type="button" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                浏览目录
              </button>
              <button className="secondary" type="button" onClick={() => setQuickFilter("开发板")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 7h10v10H7zM4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                看开发板
              </button>
            </div>
          </div>
          <div className="bench-photo" aria-label="电子实验台和电路板插画">
            <div className="pcb">
              <span className="trace" />
              <span className="trace" />
              <span className="trace" />
              <span className="trace" />
              <span className="chip" />
              <span className="led one" />
              <span className="led two" />
            </div>
          </div>
        </div>
      </section>

      <main id="catalog">
        <section className="stats" aria-label="商店数据">
          <div className="stat"><strong>3,200+</strong><span>常备 SKU</span></div>
          <div className="stat"><strong>24h</strong><span>工作日快速出库</span></div>
          <div className="stat"><strong>98%</strong><span>商品批次可追溯</span></div>
          <div className="stat"><strong>￥49</strong><span>起免基础运费</span></div>
        </section>

        <div className="layout">
          <aside className="filters" aria-label="筛选器">
            <h2>筛选</h2>
            <div className="filter-group">
              <strong>分类</strong>
              <div className="filter-grid">
                {categories.map((category) => (
                  <label key={category}>
                    {category}
                    <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} />
                  </label>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <strong>库存</strong>
              <label>仅看现货 <input type="checkbox" checked={stockOnly} onChange={(event) => setStockOnly(event.target.checked)} /></label>
              <label>适合样机 <input type="checkbox" checked={protoOnly} onChange={(event) => setProtoOnly(event.target.checked)} /></label>
            </div>
          </aside>

          <section>
            <div className="sort-row">
              <h2>精选元器件 <span>({filteredProducts.length})</span></h2>
              <select value={sortBy} aria-label="排序" onChange={(event) => setSortBy(event.target.value)}>
                <option value="popular">按热度排序</option>
                <option value="priceAsc">价格从低到高</option>
                <option value="priceDesc">价格从高到低</option>
                <option value="stockDesc">库存优先</option>
              </select>
            </div>
            <div className="products">
              {filteredProducts.length === 0 ? (
                <div className="empty">没有找到匹配的元器件，试试放宽筛选条件。</div>
              ) : (
                filteredProducts.map((product) => (
                  <article className="product" key={product.name}>
                    <div className="product-art"><ProductIcon type={product.art} /></div>
                    <div className="product-body">
                      <div className="meta">
                        <span className="tag">{product.category}</span>
                        <span>库存 {product.stock.toLocaleString("zh-CN")} 件</span>
                      </div>
                      <h3>{product.name}</h3>
                      <p className="desc">{product.desc}</p>
                      <div className="specs">
                        {product.specs.map((spec) => <span key={spec}>{spec}</span>)}
                      </div>
                      <div className="buy-row">
                        <div>
                          <div className="price">￥{product.price.toFixed(2)}</div>
                          <div className="stock">{product.proto ? "样机友好" : "批量备料"}</div>
                        </div>
                        <button className="add" type="button" aria-label={`加入 ${product.name}`} onClick={() => setCart((current) => [...current, product])}>
                          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="summary" aria-label="购物车摘要">
          <div>
            <h2>采购清单</h2>
            <p>
              {cart.length === 0
                ? "还没有添加商品。可先按项目加入样品，再统一核对规格。"
                : `已加入 ${cart.length} 件商品：${cart.slice(-3).map((product) => product.name).join("、")}`}
            </p>
          </div>
          <strong>￥{cartTotal.toFixed(2)}</strong>
          <button className="primary" type="button">提交询价</button>
        </section>
      </main>
    </>
  );
}
