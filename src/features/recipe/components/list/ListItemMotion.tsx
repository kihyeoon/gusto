import {
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";

type Props = {
  children: React.ReactNode;
};

export const ListItemMotion = ({ children }: Props) => {
  const x = useMotionValue(0);
  const dragControls = useAnimation();

  const handleDragEnd = () => {
    // x.get()를 사용하여 현재 위치를 가져옵니다.
    const currentX = x.get();

    // 가장 가까운 포인트로 스냅하는 로직
    const targetX = Math.abs(currentX + 100) < Math.abs(currentX) ? -100 : 0;

    // 애니메이션으로 스냅
    dragControls.start(
      { x: targetX },
      { type: "spring", stiffness: 300, damping: 30 },
    );
  };

  return (
    <motion.div
      className="relative"
      drag="x"
      animate={dragControls}
      dragConstraints={{ left: -100, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
