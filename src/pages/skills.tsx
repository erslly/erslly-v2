import { motion } from 'framer-motion';

// SkillItem bileşeni
const SkillItem = ({ name, icon, href }: { name: string; icon: string; href: string }) => (
  <motion.a
    className="group relative flex items-center justify-center w-full h-36 sm:h-32 bg-primary border border-indigo-900 rounded-lg overflow-hidden transition-all cursor-pointer hover:scale-105 hover:bg-secondary active:scale-95"
    href={href}
    target="_blank"
    aria-label={name}
  >
    {/* Görsel */}
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-cover rounded-md"
      />
    </div>
    
    {/* Skill adı, imleç üzerine geldiğinde görünür */}
    <p className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10px transition-all text-white">
      {name}
    </p>
    
    {/* Arka planda kararma efekti */}
    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md"></div>
  </motion.a>
);

// Skills bileşeni
export default function Skills() {
  // Teknolojilerin bilgileri (name, icon, href)
  const skills = [
    {
      name: 'TypeScript',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.png',
      href: 'https://www.typescriptlang.org/'
    },
    {
      name: 'JavaScript',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiL5_UGi2Ft1lCBH-dklG_TIe5kjwRHPEmQ&s',
      href: 'https://www.javascript.com/'
    },
    {
      name: 'React',
      icon: 'https://cdn.worldvectorlogo.com/logos/react-1.svg',
      href: 'https://reactjs.org/'
    },
    {
      name: 'Node.js',
      icon: 'https://romanbaba.vercel.app/imgs/node.svg',
      href: 'https://nodejs.org/'
    },
    {
      name: 'Python',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5VyjL4X1QghF0JTgK2-F0BvSm1Qs9_f0jpA&s',
      href: 'https://www.python.org/'
    },
    {
        name: 'HTML5',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_3V0WmaHi7hLENYgmyF3iKWD7BP4bn82grA&s',
        href: 'https://www.python.org/'
    },
    {
        name: 'CSS3',
        icon: 'https://img-c.udemycdn.com/course/480x270/522050_6f76.jpg',
        href: 'https://www.w3.org/Style/CSS/'
    },
    {
        name: 'Next.js',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9uzErWz9EXqZDxZ5lP9aYpMz8eK6rr5X3w&s',
        href: 'https://nextjs.org/'
    },
    {
        name: 'Tailwind CSS',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s',
        href: 'https://tailwindcss.com/'
    },
    {
        name: 'Vercel',
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwNwDUq_S0U6wDzS60c45kVK5zpxF-03wsQ&s',
        href: 'https://vercel.com/'
    }
  ];

  return (
    <div className="flex flex-col justify-start items-center min-h-screen p-6 bg-background pt-60"> {/* pt-12 ile üst boşluğu artırdık */}
      <h2 className="text-3xl font-bold md:text-4xl mb-2 text-left w-full">Skills 🛠️</h2>
      <p className="text-sm font-light text-left w-full text-gray-500 mb-8">
      </p>

      {/* Skill grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
        {skills.map((skill, index) => (
          <SkillItem key={index} name={skill.name} icon={skill.icon} href={skill.href} />
        ))}
      </div>
    </div>
  );
}
