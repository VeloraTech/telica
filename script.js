const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

// Checking for saved / system preference
const currentTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
if (currentTheme === "dark") {
  root.setAttribute("data-theme", "dark");
}
// Toggle and save
themeBtn.onclick = () => {
  let targetTheme =
    root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
  themeBtn.innerHTML = targetTheme === "dark" ? "🌙" : "💡";
};
// Update Icon
themeBtn.innerHTML = currentTheme === "dark" ? "🌙" : "💡";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".eyebrow").classList.add("loaded");
});

// Load the CDN in your <head> or before this script:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.5.0/chart.umd.js"></script>
const ctx = document.getElementById("myChart").getContext("2d");

// Gradient for the line
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(0, 255, 136, 0.5)");
gradient.addColorStop(1, "rgba(0, 255, 136, 0)");

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Visits",
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      backgroundColor: "#222",
      borderRadius: 5,
      type: "bar",
      order: 2,
    },
    {
      label: "Conversion Rate (%)",
      data: [2, 3, 2.5, 4.5, 3.8, 5],
      borderColor: "#00ff88",
      borderWidth: 3,
      pointBackgroundColor: "#00ff88",
      fill: true,
      backgroundColor: gradient,
      type: "line",
      yAxisID: "y1",
      order: 1,
      tension: 0.4, // Makes the line curvy/cinematic
    },
  ],
};

const config = {
  data: data,
  options: {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#222" } },
      y1: {
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { callback: (value) => value + "%" },
      },
      x: { grid: { display: false } },
    },
    plugins: {
      legend: { labels: { color: "white", font: { family: "Space Grotesk" } } },
    },
  },
};

// Intersection Observer to trigger animation on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        new Chart(ctx, config);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

observer.observe(document.querySelector(".chart-container"));
gsap.registerPlugin(ScrollTrigger);

// Scroll fade-in animation for span elements in right-visual
const spans = document.querySelectorAll(".image-container span");
spans.forEach((span, index) => {
  gsap.fromTo(
    span,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top center",
        end: "center center",
        scrub: 1,
        markers: false,
      },
    },
  );
});

// const blocks = gsap.utils.toArray(".content-block");
// const images = gsap.utils.toArray(".slide-img");

// blocks.forEach((block, i) => {
//   ScrollTrigger.create({
//     trigger: block,
//     start: "top center",
//     end: "bottom center",
//     onEnter: () => updateSection(i),
//     onEnterBack: () => updateSection(i),
//     // This toggles the text opacity as you scroll
//     onToggle: (self) =>
//       gsap.to(block, { opacity: self.isActive ? 1 : 0.2, duration: 0.5 }),
//   });
// });

// function updateSection(index) {
//   images.forEach((img, i) => {
//     if (i === index) {
//       // Fade in and scale down to 1 (looks like it's landing)
//       gsap.to(img, {
//         opacity: 1,
//         scale: 1,
//         duration: 1,
//         ease: "power2.out",
//         overwrite: true,
//       });
//     } else {
//       // Fade out and scale up slightly
//       gsap.to(img, {
//         opacity: 0,
//         scale: 1.1,
//         duration: 1,
//         ease: "power2.out",
//         overwrite: true,
//       });
//     }
//   });
// }
gsap.registerPlugin(ScrollTrigger);

// --- 1. Fix for Scroll Lock Visuals ---
const blocks = gsap.utils.toArray(".content-block");
const letters = gsap.utils.toArray(".letter-slide");

blocks.forEach((block, i) => {
  ScrollTrigger.create({
    trigger: block,
    start: "top center",
    end: "bottom center",
    onEnter: () => updateVisual(i),
    onEnterBack: () => updateVisual(i),
    onToggle: (self) =>
      gsap.to(block, { opacity: self.isActive ? 1 : 0.1, duration: 0.4 }),
  });
});

function updateVisual(index) {
  letters.forEach((letter, i) => {
    if (i === index) {
      letter.classList.add("active");
    } else {
      letter.classList.remove("active");
    }
  });
}

// --- 2. Chart.js Configurations & Data ---
Chart.defaults.color = "#555"; // Global text color
Chart.defaults.font.family = "Inter, sans-serif";

// Chart 1: Sales vs Conversion (Area Chart)
function initSalesChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  // Gradients for the fill
  const gradEmerald = ctx.createLinearGradient(0, 0, 0, 350);
  gradEmerald.addColorStop(0, "rgba(0, 255, 136, 0.3)");
  gradEmerald.addColorStop(1, "rgba(0, 255, 136, 0.01)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
      datasets: [
        {
          label: "Qualified Leads (Traffic)",
          data: [500, 700, 650, 900, 1100, 1300],
          borderColor: "rgba(255,255,255,0.2)",
          borderWidth: 2,
          borderDash: [5, 5], // Dashed line
          pointRadius: 0,
          fill: false,
          tension: 0.4,
        },
        {
          label: "Closed Sales (Conversion)",
          data: [100, 350, 400, 600, 750, 950],
          borderColor: "#00ff88",
          borderWidth: 3,
          backgroundColor: gradEmerald, // Fill the area
          fill: true,
          pointBackgroundColor: "#00ff88",
          pointRadius: 4,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }, // Hide default legend
      scales: {
        y: {
          stacked: false,
          grid: { color: "#1a1a1a" },
          ticks: { display: false },
        },
        x: { grid: { display: false } },
      },
      animation: { duration: 2500, easing: "easeOutQuart" },
    },
  });
}

// Chart 2: Uptime vs Latency (Combo Chart)
function initUptimeChart() {
  const ctx = document.getElementById("uptimeChart").getContext("2d");

  new Chart(ctx, {
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          type: "line",
          label: "System Latency (ms)",
          data: [60, 55, 45, 70, 50, 45, 40],
          borderColor: "#0088ff",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.1, // Jagged line for speed
          yAxisID: "yLat", // Right axis
        },
        {
          type: "bar",
          label: "Uptime SLA (%)",
          data: [99.99, 99.99, 99.98, 99.99, 99.99, 100, 99.99],
          backgroundColor: "#111",
          borderColor: "#222",
          borderWidth: 1,
          borderRadius: 5,
          yAxisID: "yUp", // Left axis
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        yUp: {
          // Uptime Axis
          position: "left",
          min: 99.9, // Focus on the very top
          max: 100,
          grid: { color: "#1a1a1a" },
          ticks: { callback: (value) => value + "%" },
        },
        yLat: {
          // Latency Axis
          position: "right",
          min: 0,
          max: 100,
          grid: { drawOnChartArea: false }, // Don't draw grid lines over bars
          ticks: { callback: (value) => value + "ms" },
        },
        x: { grid: { display: false } },
      },
      animation: { duration: 2000, easing: "easeOutElastic" },
    },
  });
}

// --- 3. ScrollTrigger to Animate Charts on Reveal ---
// Animate the Chart Containers
gsap.utils.toArray(".chart-wrapper").forEach((wrapper) => {
  gsap.to(wrapper, {
    scrollTrigger: {
      trigger: wrapper,
      start: "top 80%", // Triggers when top of chart hits 80% down viewport
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  });
});

// Specific Triggers to start the Chart.js animation
ScrollTrigger.create({
  trigger: "#sales-chart-section",
  start: "top 70%",
  once: true, // Only trigger once
  onEnter: initSalesChart,
});

ScrollTrigger.create({
  trigger: "#uptime-chart-section",
  start: "top 70%",
  once: true,
  onEnter: initUptimeChart,
});
