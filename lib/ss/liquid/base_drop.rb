class SS::Liquid::BaseDrop < Liquid::Drop
  private
    def controller
      @_controller ||= @context.registers['controller']
    end

    def view_context
      @_view_context ||= @context.registers['view_context']
    end
end
