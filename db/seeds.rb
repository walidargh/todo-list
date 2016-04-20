# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

20.times do
  Todo.create(
  title: Faker::Company.name,
  body: Faker::Hipster.sentence,
  done: [true, false].sample
  )
end

20.times do
  TodoStep.create(
  title: Faker::Company.name,
  body: Faker::Hipster.sentence,
  done: [true, false].sample,
  todo_id: 33
  )
end
