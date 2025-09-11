# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

  const inAnimation = (nextIndex) => {

    const optionButtons = gsap.utils.toArray('.option-button');

    if(questions[nextIndex].options.length>4){
      // optionButtons[optionButtons.length - 1].style.marginBottom = "4rem";
      for(let i=4;i<optionButtons.length;i++){
        gsap.set(optionButtons[i], {
          opacity: 0,
          x: i % 2 === 0 ? -100 : 100,
          delay: 0,
          duration: 0,
          
          
        });
    }
    
   }
   
    gsap.set(optionButtons, { x: 0, opacity: 0 });    

  
    gsap.from('.question-header', {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        gsap.set('.question-header', { clearProps: 'all' });

        
        gsap.utils.toArray('.option-button').forEach((el, index) => {
         
          
          gsap.from(el, {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.3, // this delay is now relative to header's finish
            ease: "power2.out",
            onComplete: () => {
              gsap.set(el, { clearProps: 'all' });
            }
          });
      
           
        });
      }
    });
  };