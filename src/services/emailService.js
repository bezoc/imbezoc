// Serviço para gerenciar diferentes provedores de email
export class EmailService {
  constructor() {
    this.provider = this.detectProvider();
  }

  detectProvider() {
    // Detecta automaticamente o provedor baseado no ambiente
    if (window.location.hostname.includes('netlify.app') || 
        window.location.hostname.includes('netlify.com') ||
        document.querySelector('form[data-netlify]')) {
      return 'netlify';
    }
    return 'default';
  }

  async sendEmail(formData) {
    switch (this.provider) {
      case 'netlify':
        return await NetlifyFormService.send(formData);
      default:
        return await DefaultFormService.send(formData);
    }
  }
}

// Serviço específico para Netlify Forms
export class NetlifyFormService {
  static async send(formData) {
    try {
      // Para Netlify Forms, retorna sucesso após validação
      // O Netlify processa o formulário automaticamente via HTML
      console.log('Netlify Forms: Dados preparados para envio', formData);
      
      // Validação dos dados
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Campos obrigatórios não preenchidos');
      }
      
      return {
        success: true,
        message: 'Formulário validado e pronto para envio!'
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

// Serviço padrão para outros provedores
export class DefaultFormService {
  static async send(formData) {
    try {
      // Implementação para outros serviços como EmailJS, Formspree, etc.
      console.log('Enviando via serviço padrão:', formData);
      
      // Simula envio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        message: 'Formulário enviado com sucesso!'
      };
    } catch (error) {
      console.error('Erro no envio:', error);
      return {
        success: false,
        message: 'Erro ao enviar formulário. Tente novamente.'
      };
    }
  }
}

// Utilitários para validação de formulário
export class FormValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateRequired(value) {
    return value && value.trim().length > 0;
  }

  static validateMinLength(value, minLength) {
    return value && value.trim().length >= minLength;
  }

  static validateForm(formData) {
    const errors = [];

    if (!this.validateRequired(formData.name)) {
      errors.push('Nome é obrigatório');
    }

    if (!this.validateRequired(formData.email)) {
      errors.push('Email é obrigatório');
    } else if (!this.validateEmail(formData.email)) {
      errors.push('Email inválido');
    }

    if (!this.validateRequired(formData.subject)) {
      errors.push('Assunto é obrigatório');
    }

    if (!this.validateRequired(formData.message)) {
      errors.push('Mensagem é obrigatória');
    } else if (!this.validateMinLength(formData.message, 10)) {
      errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Exportação padrão
export default EmailService;