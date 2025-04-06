document.addEventListener("DOMContentLoaded", () => {
    const nakshatras = [
        { name: "Ashwini", stars: "β & γ Arietis", region: "Aries" },
        { name: "Bharani", stars: "35, 39 Arietis", region: "Aries" },
        { name: "Krittika", stars: "Pleiades (η Tauri)", region: "Taurus" },
        { name: "Rohini", stars: "Aldebaran (α Tauri)", region: "Taurus" },
        { name: "Mrigashira", stars: "λ, φ Orionis", region: "Orion" },
        { name: "Ardra", stars: "Betelgeuse (α Orionis)", region: "Orion" },
        { name: "Punarvasu", stars: "Castor & Pollux (Gemini)", region: "Gemini" },
        { name: "Pushya", stars: "γ, δ, θ Cancri", region: "Cancer" },
        { name: "Ashlesha", stars: "ε, δ, η Hydrae", region: "Hydra" },
        { name: "Magha", stars: "Regulus (α Leonis)", region: "Leo" },
        { name: "Purva Phalguni", stars: "δ, θ Leonis", region: "Leo" },
        { name: "Uttara Phalguni", stars: "Denebola (β Leonis)", region: "Leo" },
        { name: "Hasta", stars: "α, β, γ, δ, ε Corvi", region: "Corvus" },
        { name: "Chitra", stars: "Spica (α Virginis)", region: "Virgo" },
        { name: "Swati", stars: "Arcturus (α Bootis)", region: "Bootes" },
        { name: "Vishakha", stars: "α, β Librae", region: "Libra" },
        { name: "Anuradha", stars: "β, δ, π Scorpii", region: "Scorpius" },
        { name: "Jyeshta", stars: "Antares (α Scorpii)", region: "Scorpius" },
        { name: "Mula", stars: "ε, ζ Scorpii", region: "Scorpius" },
        { name: "Purva Ashadha", stars: "δ, ε Sagittarii", region: "Sagittarius" },
        { name: "Uttara Ashadha", stars: "σ, τ Sagittarii", region: "Sagittarius" },
        { name: "Shravana", stars: "Altair (α Aquilae)", region: "Aquila" },
        { name: "Dhanishta", stars: "β Delphini", region: "Delphinus" },
        { name: "Shatabhisha", stars: "γ Aquarii", region: "Aquarius" },
        { name: "Purva Bhadrapada", stars: "α Pegasi", region: "Pegasus" },
        { name: "Uttara Bhadrapada", stars: "γ Pegasi", region: "Pegasus" },
        { name: "Revati", stars: "ζ Piscium", region: "Pisces" }
    ];

    const overlay = document.getElementById('nakshatra-overlay');

    overlay.innerHTML = `
        <h3>Ancient Nakshatras</h3>
        <ul>
            ${nakshatras.map(n => `<li><strong>${n.name}</strong>: ${n.stars} (${n.region})</li>`).join('')}
        </ul>
    `;
});
