<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Registar Pontos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="/registar-partida" method="post">
                        @csrf
                        {{-- <div class="mb-4">
                            <label for="match_id" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Match ID</label>
                            <input type="text" name="match_id" id="match_id" class="form-input
                            rounded-md shadow-sm mt-1 block w-full" value="{{ old('match_id') }}" />
                        </div> --}}
                        <div class="mb-4">
                            <label for="user_id" class="block text-sm font-medium text-gray-700 dark:text-gray-200">User</label>
                            <select name="user_id" id="user_id" class="form-select rounded-md shadow-sm mt-1 block w-full text-gray-700">
                                <option value="">Select User</option>
                                @foreach($users as $user)
                                    <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                                        {{ $user->name }}
                                    </option>
                                @endforeach
                            </select>



                            {{-- <label for="player_id" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Player ID</label>
                            <input type="text" name="player_id" id="player_id" class="form-input
                            rounded-md shadow-sm mt-1 block w-full" value="{{ old('player_id') }}" /> --}}
                        </div>
                        <div class="mb-4">
                            <label for="points" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Points</label>
                            <input type="text" name="points" id="points" class="form-input
                            rounded-md shadow-sm mt-1 block w-full text-gray-700" value="{{ old('points') }}" />
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
