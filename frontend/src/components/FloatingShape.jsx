import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 ${color} ${size}   blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "10%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 100,
        ease: "linear",
        repeat: "infinity",
        delay: delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
