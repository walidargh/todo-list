class TodoStepsController < ApplicationController
  def index
    @todo_steps = TodoStep.all
    render json: @todo_steps
  end

  def create
    @todo_step = Todo.new(todo_step_params)
    @todo_step.save!
    render json: @todo_step
  end

  def destroy
    @todo_step = Todo.find_by(params[:id])
    @todo_step.destroy
    render json: @todo_step
  end

  def update
    @todo_step = Todo.find_by(params[:id])
    @todo_step.update!(todo_step_params)
    render json: @todo_step
  end

  private

  def todo_step_params
    params.require(:todo_step).permit(:title, :body, :done, :todo_id)
  end
end
