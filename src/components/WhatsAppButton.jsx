const WhatsAppButton = () => {
  const ownerNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const message = `
Hello!
I’m interested in your books and would like more information.
`;

  const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
    >
      💬 WhatsApp
    </a>
  );
};

export default WhatsAppButton;
