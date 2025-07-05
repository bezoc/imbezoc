export class NetlifyFormService {
  static async send(formData) {
    try {
      // Para Netlify Forms, o envio é feito via POST nativo
      // Este método é usado apenas para validação e feedback
      console.log('Netlify Forms: Dados preparados para envio', formData);
      
      // Simula o processamento (o Netlify fará o envio real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Formulário enviado com sucesso via Netlify Forms!'
      };
    } catch (error) {
      console.error('Erro no Netlify Forms:', error);
      return {
        success: false,
        message: 'Erro ao enviar formulário. Tente novamente.'
      };
    }
  }

  static validateNetlifyForm(form) {
    // Verifica se o formulário tem os atributos necessários do Netlify
    const hasNetlifyAttr = form.hasAttribute('data-netlify');
    const hasFormName = form.hasAttribute('name');
    const hasHiddenFormName = form.querySelector('input[name="form-name"]');
    const hasHoneypot = form.querySelector('input[name="bot-field"]');

    if (!hasNetlifyAttr) {
      console.warn('Formulário não tem atributo data-netlify');
      return false;
    }

    if (!hasFormName) {
      console.warn('Formulário não tem atributo name');
      return false;
    }

    if (!hasHiddenFormName) {
      console.warn('Formulário não tem campo oculto form-name');
      return false;
    }

    if (!hasHoneypot) {
      console.warn('Formulário não tem campo honeypot para spam');
      return false;
    }

    return true;
  }
}