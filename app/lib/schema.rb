require 'yaml'

# The json-schema gem natively expects schemas to be json documents, so if we allow it to resolve $ref references it will expect json files
# We can subvert this by loading the schemas ourself and registering them with json-schema so that it never actually loads a schema file itself
#
module Schema
  def self.register!
    Rails.root.join('schemas').glob('**/*.yml') do |path|
      JSON::Validator.add_schema(JSON::Schema.new(YAML.safe_load(File.read(path)), Addressable::URI.parse(path.to_s)))
    end
  end

  def self.key(path)
    "file:///#{path}"
  end
end
