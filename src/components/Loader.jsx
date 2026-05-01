import { motion } from "framer-motion"

function Loader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#1f0d07] text-[#fff8c9]">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#fff8c9]"
        >
          <div className="h-10 w-10 rounded-full border border-[#fff8c9]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-2xl uppercase tracking-[0.25em]"
        >
          INKSPIRED
        </motion.p>
      </div>
    </div>
  )
}

export default Loader