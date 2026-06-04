/* Shared contact configuration — single source of truth for all contact links */
const CONTACT = {
  email: "ahdhili832@gmail.com",
  phone: "+216 20 021 903",
  whatsapp: "21620021903",
  github: "ahmedhdhili832-dotcom",
  subject: "Web Development Project",
  body: "Hello Ahmed,\n\nI visited your portfolio and I would like to talk with you about a web development project.\n\nThank you.",
  whatsappText: "Hello Ahmed, I visited your portfolio and I would like to talk with you about a web development project.",
};

function buildMailtoHref({ email, subject, body }) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildWhatsAppHref({ whatsapp, whatsappText }) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappText)}`;
}

/* Populate all contact links from the shared config */
document.querySelectorAll("[data-contact]").forEach((el) => {
  const type = el.dataset.contact;
  if (type === "email") {
    el.href = buildMailtoHref(CONTACT);
  } else if (type === "whatsapp") {
    el.href = buildWhatsAppHref(CONTACT);
  } else if (type === "github") {
    el.href = `https://github.com/${CONTACT.github}`;
  }
});

/* Dynamic footer year */
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}
