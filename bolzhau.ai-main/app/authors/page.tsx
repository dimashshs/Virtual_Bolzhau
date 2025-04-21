"use client";
export default function AuthorsAndPartners() {
  const teamMembers = [
    {
      name: "Базаралы Қанат Амангелдіұлы",
      description: "Цифрлық үкіметті қолдау орталығының қаржы-экономикалық блок директорының орынбасары",
      image: "/images/1photo.jpg",
    },
    {
      name: "Әбу Мариям Мұратқызы",
      description: "Цифрлық үкіметті қолдау орталығының орта деңгейлі сарапшысы",
      image: "/images/Maryiam.jpg",
    },
    {
      name: "Құсайын Дінмұхамед Ғабитұлы",
      description: "Цифрлық үкіметті қолдау орталығының жас сарапшысы",
      image: "/images/2photo.jpg",
    },
  ];

  const partners = [
    {
      logo: "/images/images.jpg",
      name: "Company 1",
      href: "https://govtec.kz/",
    },
    {
      logo: "/images/Logo_astana_it_university.png",
      name: "Company 2",
      href: "https://astanait.edu.kz/",
    },
    {
      logo: "/images/ministry.png",
      name: "Company 3",
      href: "https://www.gov.kz/memleket/entities/mdai/",
    },
  ];

  return (
    <div className="p-8 space-y-16 pt-20">
      {/* Наши партнёры */}
      <section>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Біздің серіктестер</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center p-4 border rounded-lg shadow hover:shadow-lg transition duration-200 bg-white"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 object-contain"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Наша команда */}
      <section>
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Біздің команда</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="card w-96 h-112 relative inline-block mb-8"
            >
              <div className="front p-6 rounded-lg shadow-lg text-center">
                <div className="contact mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-28 object-cover rounded-full mx-auto"
                  />
                </div>
                <h3 className="name text-xl">{member.name}</h3>
              </div>
              <div className="back p-6 rounded-lg shadow-lg text-center text-white">
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
