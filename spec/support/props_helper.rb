module PropsHelper
  def props(string, selector, attr: "props")
    element = Capybara.string(string).first(selector)
    JSON.parse(element["data-#{attr}"], symbolize_names: true)
  end
end
