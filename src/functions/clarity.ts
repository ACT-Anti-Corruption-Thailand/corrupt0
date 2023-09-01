export const initClarity = () => {
  const w = window as any;
  w.clarity =
    w.clarity ||
    function (...a: any) {
      (w.clarity.q = w.clarity.q || []).push(a);
    };
  const t = document.createElement("script");
  t.async = true;
  t.src = "https://www.clarity.ms/tag/io5u68c67v";
  const y = document.getElementsByTagName("script")[0];
  y?.parentNode?.insertBefore(t, y);
};
